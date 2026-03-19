from flask import Flask, Response, redirect, url_for, json, jsonify, request
import mysql.connector
from mysql.connector import Error
import hashlib
from datetime import datetime, timezone, timedelta
from flask_cors import CORS
import jwt

main = Flask(__name__)
CORS(main)

SECRET_KEY = 'mysecretkey'

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            username='root',
            password='',
            database='flask_python'
        )
        if conn.is_connected():
            return conn
        
    except mysql.connector.Error as e:
        print(f"Error : {e}")
        return None
    
def get_current_date_time():
    now = datetime.now()
    return now.strftime('%Y-%m-%d'), now.strftime('%I:%M:%S %p')

@main.route("/api/login_users", methods=['POST'])
def user_login():
    if request.method == 'POST':
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        data = request.get_json()

        try:
            email = data['email']
            hashed_password = data['password']
            password = hashlib.md5(hashed_password.encode()).hexdigest()

            if not email:
                return jsonify({
                    "status": "error",
                    "message": "Email is required"
                }), 400
            elif not password:
                return jsonify({
                    "status": "error",
                    "message": "Password is required"
                }), 400
            
            
    
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()

            if not user:
                return jsonify({
                    "status": "error",
                    "message": "User not found"
                }), 404

            if user['password'] != password:
                return jsonify({
                    "status": "error",
                    "message": "Invalid password"
                }), 401
            
            token = jwt.encode(
                {
                    "user_id": user["id"],
                    "email": user["email"],
                    "exp": datetime.now(timezone.utc) + timedelta(hours=2)
                },
                SECRET_KEY,
                algorithm="HS256"
            )

            return jsonify({
                "status": "success",
                "message": "Login successful",
                "token": token,
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"]
                }
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

        finally:
            cursor.close()
            conn.close()

@main.route('/api/create_user', methods=['POST'])
def create():
    if request.method == 'POST':
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        data = request.get_json()
        try:
            name = data['name']
            email = data['email']
            hashed_password = data['password']
            password = hashlib.md5(hashed_password.encode()).hexdigest()
            mobile = data['mobile']
            account_type = data['account_type']

            cursor.execute('SELECT * FROM users where email=%s',(email,))
            dataFetch = cursor.fetchone()
            if dataFetch:
                return jsonify({
                    "status": "info",
                    "message": "email in use"
                }),200
            
            add_date, add_time = get_current_date_time()

            cursor.execute('INSERT INTO users(name, email, mobile, password, account_type, status, add_date, add_time) value(%s,%s,%s,%s,%s,"active",%s,%s)',(name, email, mobile, password, account_type,add_date,add_time))
            conn.commit()
            return jsonify({
                "status": "success",
                "message":"account created successfully",
                "user_data":{
                    "name": name,
                    "email": email,
                    "password": hashed_password,
                    "mobile":mobile,
                    "account_type": account_type
                }
            })

        except Exception as e:
            return jsonify({
                "status":"error",
                "message":str(e)
            }), 500
        
        finally:
            cursor.close()
            conn.close()

@main.route('/api/bookData')
def getBook():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM `books` LIMIT 6")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

@main.route('/api/bookData/<int:book_id>')
def getBookIdFetch(book_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM `books` WHERE id=%s",(book_id,))
    data = cursor.fetchone()
    cursor.close()
    conn.close()
    return jsonify(data)

@main.route('/api/addToCart', methods=['POST'])
def userCart():
    try:
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({
                "status": "error",
                "message": "Login required"
            }), 401
        
        token = token.split(" ")[1]
        decode = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decode['user_id']
        email = decode['email']

        data = request.get_json()
        book_id = data['book_id']
        qty = data.get("qty",1)
        add_date, add_time = get_current_date_time()

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM user_cart WHERE user_id=%s and book_id=%s',(user_id, book_id))
        cart_item = cursor.fetchone()

        if cart_item:
            cursor.execute("UPDATE user_cart SET qty=qty+%s WHERE user_id=%s AND book_id=%s",(qty, user_id, book_id))
            message = 'Cart updated'

        else:
            cursor.execute("INSERT INTO user_cart(user_id, email, book_id, qty, cart_type, add_date, add_time) VALUES(%s,%s,%s,%s,'1',%s,%s)",(user_id, email, book_id, qty, add_date, add_time))
            message = "Added to cart"

        conn.commit()
        return jsonify({
            "status" : "success",
            "message": message
        })
    
    except Exception as e:
        return jsonify({
            "status":"error",
            "message":str(e)
        }),500
    finally:
        cursor.close()
        conn.close()

@main.route('/api/viewCart')
def view_cart():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message':'Login required'}),401
    
    token = token.split(' ')[1]
    decode = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    email = decode['email']

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT user_cart.email, user_cart.qty, user_cart.book_id, ' 
    'books.id, books.coverpage, books.discounted_price FROM `user_cart` ' 
    'INNER JOIN books ON user_cart.book_id= books.id WHERE user_cart.email = %s',(email,))

    cart_items = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(cart_items)

@main.route('/api/updateCartQty', methods=['POST'])
def update_cart_qty():
    conn = None
    cursor = None

    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'Message':'Login required'}),401
        
        token = token.split(' ')[1]
        decode = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

        user_id = decode['user_id']
        data = request.get_json()
        book_id = data['book_id']
        action = data['action']

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT qty FROM user_cart WHERE user_id=%s AND book_id=%s",(user_id, book_id))
        item = cursor.fetchone()

        if not item:
            return jsonify({'Message':'Item not found'}),404
        
        qty = item['qty']

        if action=='increase':
            cursor.execute('UPDATE user_cart SET qty=qty+1 where user_id=%s and book_id=%s',(user_id, book_id))

        elif action=='decrease':
            cursor.execute('UPDATE user_cart SET qty = qty - 1 WHERE user_id=%s AND book_id=%s AND qty > 1',(user_id, book_id))
            
        
        conn.commit()
        return jsonify({
            "status":"success",
            "qty":qty
        })

    except Exception as e:
        return jsonify({
            'status':'error',
            'message':str(e)
        }),500
    
    finally:
        if conn and cursor:
            cursor.close()
            conn.close()

@main.route('/api/removeFromCart', methods=['POST'])
def removeItem():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({
                "message":"login required"
            }),401
        token = token.split(' ')[1]
        decode = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user_id = decode['user_id']
        data = request.get_json()
        book_id = data['book_id']
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute('DELETE FROM user_cart WHERE user_id=%s AND book_id=%s',(user_id, book_id))
        conn.commit()

        return jsonify({
            'status':'success',
            'message': 'Item removed from cart'
        }), 200
    except Exception as e:
        return jsonify({
            'status':'error',
            'message':str(e)
        }), 500
    finally:
        cursor.close()
        conn.close()

@main.route('/api/address', methods=['POST'])
def save_address():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({
                'message':'Login required'
            }), 401

        token = token.split(' ')[1]
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user_id = decoded['user_id'] 
        email = decoded['email']
        data = request.get_json()

        name = data['name']
        mobile = data['mobile']
        address = data['address']
        state = data['state']
        district = data['district']
        pincode = data['pincode']
        add_type = data['add_type']
        add_date, add_time = get_current_date_time()

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM address WHERE user_email=%s and user_id=%s',(email, user_id))
        
        if cursor.fetchone():
            return jsonify({
                'message':"Address already added "
            })
        
        else:
            cursor.execute('INSERT INTO address(user_id, user_email, name, mobile, email, address, ' 
            'state, district, pincode, add_type, add_date, add_time) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)',
            (user_id, email, name, mobile, email, address, state, district, pincode, add_type, add_date, add_time))
            conn.commit()
            return jsonify({
                'status':'success',
                'message':'Address Saved'
            })
    except Exception as e:
        return jsonify({
            'status':'error',
            'message':str(e)
        }), 500
    finally:
        if conn and cursor:
            cursor.close()
            conn.close()

@main.route('/api/getAddress', methods=['GET'])
def get_address():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Login required'}), 401

        token = token.split(' ')[1]
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

        user_id = decoded['user_id']
        email = decoded['email']

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            'SELECT * FROM address WHERE user_email=%s AND user_id=%s',
            (email, user_id)
        )

        data = cursor.fetchone()

        return jsonify(data if data else {})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if conn and cursor:
            cursor.close()
            conn.close()

@main.route('/api/createInvoice', methods=['POST'])
def create_invoice():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Login required'}), 401

        token = token.split(' ')[1]
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

        user_id = decoded['user_id']
        email = decoded['email']

        data = request.get_json()

        name = data['name']
        mobile = data['mobile']
        address = data['address']
        state = data['state']
        district = data['district']
        pincode = data['pincode']

        subtotal = data['subtotal']
        shipping = data['shipping']
        handling = data['handling']
        total = data['total']

        add_date, add_time = get_current_date_time()

        invoice_no = f"IN-ON-{add_date}-{user_id}"
        order_id = f"OR-ON-{add_date}-{user_id}"

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO invoice
            (invoice_no, order_id, user_id, user_email, name, email, mobile, address,
            state, district, pincode, price, dis_price, shipping_charges,
            handling_charges, total_price, add_date, add_time)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            invoice_no, order_id, user_id, email,
            name, email, mobile, address,
            state, district, pincode,
            subtotal, 0, shipping, handling, total,
            add_date, add_time
        ))

        conn.commit()

        return jsonify({
            "status": "success",
            "invoice_no": invoice_no,
            "order_id": order_id
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

    finally:
        if conn and cursor:
            cursor.close()
            conn.close()

@main.route('/api/getInvoice/<string:invoice_no>')
def get_invoice(invoice_no):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM invoice WHERE invoice_no=%s", (invoice_no,))
    data = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify(data)

if __name__ == "__main__":
    main.run(debug=True, host='0.0.0.0', port=5006)