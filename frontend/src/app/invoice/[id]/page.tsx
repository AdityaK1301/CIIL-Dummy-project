'use client'
import { useEffect, useState } from 'react'

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {

  const [invoice, setInvoice] = useState<any>(null)
  const [invoiceId, setInvoiceId] = useState("")

  useEffect(() => {
    const load = async () => {
      const resolved = await params
      setInvoiceId(resolved.id)
    }
    load()
  }, [])

  useEffect(() => {
    if (invoiceId) fetchInvoice()
  }, [invoiceId])

  const fetchInvoice = async () => {
    const res = await fetch(
      `http://127.0.0.1:5006/api/getInvoice/${invoiceId}`
    )
    const data = await res.json()
    setInvoice(data)
  }

  if (!invoice) return <div>Loading...</div>

  return (
    <div className="p-10 max-w-3xl bg-white">
      <h1 className="text-3xl font-bold mb-6">Invoice</h1>

      <div className="border p-6 rounded space-y-3">
        <p><b>Invoice No:</b> {invoice.invoice_no}</p>
        <p><b>Order ID:</b> {invoice.order_id}</p>

        <hr />

        <p><b>Name:</b> {invoice.name}</p>
        <p><b>Email:</b> {invoice.email}</p>
        <p><b>Mobile:</b> {invoice.mobile}</p>

        <p><b>Address:</b> {invoice.address}</p>
        <p><b>State:</b> {invoice.state}</p>
        <p><b>District:</b> {invoice.district}</p>
        <p><b>Pincode:</b> {invoice.pincode}</p>

        <hr />

        <p>Products: ₹{invoice.price}</p>
        <p>Shipping: ₹{invoice.shipping_charges}</p>
        <p>Handling: ₹{invoice.handling_charges}</p>

        <h2 className="text-xl font-bold mt-4">
          Total: ₹{invoice.total_price}
        </h2>
      </div>
    </div>
  )
}