import { useState } from 'react'

const initialProducts = [
  {
    id: 'BLU-TS-001',
    name: 'Blue T-Shirt',
    quantity: 120,
    price: 499,
    status: 'Active',
  },
  {
    id: 'MUG-002',
    name: 'Coffee Mug',
    quantity: 210,
    price: 249,
    status: 'Low Stock',
  },
  {
    id: 'NBK-010',
    name: 'Notebook',
    quantity: 150,
    price: 149,
    status: 'Active',
  },
]

export default function VendorInventory() {
  const [products, setProducts] = useState(initialProducts)
  const [editedRows, setEditedRows] = useState({})
  const [openMenuId, setOpenMenuId] = useState(null)

  const handleChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    )
    setEditedRows((prev) => ({ ...prev, [id]: true }))
  }

  const handleSave = () => {
    setEditedRows({})
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Inventory</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 text-sm bg-white">
            Import
          </button>
          <button className="px-4 py-2 border border-gray-200 text-sm bg-white">
            Export
          </button>
          <button className="px-4 py-2 border border-gray-200 text-sm bg-white">
            + Add Product
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <input
          className="border border-gray-200 rounded px-3 py-2 text-sm w-72"
          placeholder="Search by name or ID"
        />
        <button className="border border-gray-200 rounded px-4 py-2 text-sm bg-white">
          Filter
        </button>
        <button className="border border-gray-200 rounded px-4 py-2 text-sm bg-white">
          Bulk Actions ▾
        </button>
        <span className="text-sm text-gray-500">0 selected</span>
      </div>

      {/* Hint */}
      <div className="text-sm text-gray-500">
        Make inline edits to quantity or price —{' '}
        <span className="font-medium">Save</span> button appears.
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr className="text-left text-gray-500">
              <th className="p-3 w-8">
                <input type="checkbox" />
              </th>
              <th className="p-3">Product ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 text-gray-700">{p.id}</td>
                <td className="p-3 text-gray-700">{p.name}</td>
                <td className="p-3">
                  <input
                    className="border border-gray-200 rounded px-2 py-1 w-20 text-sm"
                    value={p.quantity}
                    onChange={(e) =>
                      handleChange(p.id, 'quantity', e.target.value)
                    }
                  />
                </td>
                <td className="p-3">
                  <input
                    className="border border-gray-200 rounded px-2 py-1 w-20 text-sm"
                    value={`₹${p.price}`}
                    onChange={(e) =>
                      handleChange(
                        p.id,
                        'price',
                        e.target.value.replace('₹', '')
                      )
                    }
                  />
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${p.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                      }`}
                  >
                    {p.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === p.id ? null : p.id)
                    }
                    className="px-2 py-1 border border-gray-200 rounded text-gray-500 hover:bg-gray-50"
                  >
                    ⋮
                  </button>

                  {openMenuId === p.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-sm z-10">
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                        Inactive
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                        Active
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Showing 1–3 of 320 items
        </span>

        {Object.keys(editedRows).length > 0 && (
          <button
            onClick={handleSave}
            className="px-6 py-2 border border-gray-200 rounded text-sm bg-white"
          >
            Save
          </button>
        )}
      </div>
    </div>
  )
}
