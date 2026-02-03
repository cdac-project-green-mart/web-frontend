import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getVendorProducts, updateVendorProduct, deleteVendorProduct } from '../api/products'
import { getInventory, setStock } from '../api/inventory'
import { normalizeApiError } from '../api/axios'

export default function VendorInventory() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editedRows, setEditedRows] = useState({})
  const [openMenuId, setOpenMenuId] = useState(null)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isDeleting, setIsDeleting] = useState(false)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getVendorProducts()
      const list = Array.isArray(data) ? data : []
      const withStock = await Promise.all(
        list.map(async (p) => {
          const id = p._id || p.id
          let quantity = null
          try {
            const inv = await getInventory(id)
            quantity = inv?.quantity ?? inv?.stock ?? null
          } catch {
            quantity = null
          }
          const q = quantity != null ? Number(quantity) : 0
          return {
            id: id,
            productId: id,
            name: p.name,
            quantity: q,
            price: Number(p.price) || 0,
            status: q > 0 ? (q < 10 ? 'Low Stock' : 'Active') : 'Out of Stock',
            image: p.images?.[0]
          }
        })
      )
      setProducts(withStock)
    } catch (err) {
      setError(normalizeApiError(err).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  // Filtered products based on search and status filter
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search filter
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = query === '' ||
        p.name.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)

      // Status filter
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [products, searchQuery, statusFilter])

  // Handle inline edits
  const handleChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    )
    setEditedRows((prev) => ({ ...prev, [id]: true }))
  }

  // Handle selection of individual rows (only from filtered products)
  const handleSelect = (id) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  // Handle Select All (selects only filtered products)
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredProducts.map(p => p.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const isAllSelected = filteredProducts.length > 0 && selectedIds.size === filteredProducts.length

  const handleSave = async () => {
    const idsToUpdate = Object.keys(editedRows)
    setError('')
    for (const id of idsToUpdate) {
      const product = products.find(p => p.id === id)
      if (!product) continue
      try {
        await updateVendorProduct(id, { price: Number(product.price) })
        await setStock(id, { quantity: Number(product.quantity) })
      } catch (err) {
        setError(normalizeApiError(err).message)
        return
      }
    }
    setEditedRows({})
    loadProducts()
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return
    setError('')
    try {
      await deleteVendorProduct(id)
      loadProducts()
    } catch (err) {
      setError(normalizeApiError(err).message)
    }
  }

  // Bulk delete selected products
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    const count = selectedIds.size
    if (!confirm(`Delete ${count} selected product(s)? This action cannot be undone.`)) return

    setIsDeleting(true)
    setError('')
    setIsBulkActionsOpen(false)

    let successCount = 0
    let failCount = 0

    for (const id of selectedIds) {
      try {
        await deleteVendorProduct(id)
        successCount++
      } catch {
        failCount++
      }
    }

    setIsDeleting(false)
    setSelectedIds(new Set())

    if (failCount > 0) {
      setError(`Deleted ${successCount} product(s). Failed to delete ${failCount} product(s).`)
    }

    loadProducts()
  }

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)

  if (loading) {
    return (
      <div className="space-y-4 font-sans text-gray-800">
        <h1 className="text-2xl font-semibold text-gray-700">Inventory</h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 font-sans text-gray-800">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}
      {/* Header Row */}
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-2xl font-semibold text-gray-700">Inventory</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium">
            Import
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium">
            Export
          </button>
          <Link to="/add-product">
            <button className="px-4 py-2 border border-gray-800 rounded bg-white text-gray-800 hover:bg-gray-50 text-sm font-semibold">
              + Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            className="w-full border border-gray-200 rounded px-3 py-2 pl-9 text-sm focus:outline-none focus:border-gray-400"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Status Filter Dropdown */}
        <select
          className="px-4 py-2 border border-gray-200 rounded bg-gray-100 text-gray-600 text-sm focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        {/* Bulk Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}
            className="px-4 py-2 border border-gray-200 rounded bg-gray-100 text-gray-600 text-sm flex items-center gap-2 hover:bg-gray-200"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Bulk Actions'}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isBulkActionsOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsBulkActionsOpen(false)}
              ></div>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-20 overflow-hidden py-1">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedIds.size === 0}
                >
                  Mark as Active
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedIds.size === 0}
                >
                  Mark as Inactive
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedIds.size === 0}
                  onClick={handleBulkDelete}
                >
                  Delete Selected ({selectedIds.size})
                </button>
              </div>
            </>
          )}
        </div>

        <div className="border border-gray-200 rounded px-3 py-2 text-sm bg-white text-gray-600 min-w-[100px]">
          {selectedIds.size} selected
        </div>
      </div>

      {/* Info Bar with Save Button */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-2">
        <div className="text-sm text-gray-500">
          Make inline edits to quantity or price — <span className="font-bold text-gray-700">Save</span> button appears.
        </div>
        {Object.keys(editedRows).length > 0 ? (
          <button
            onClick={handleSave}
            className="px-6 py-1 border border-gray-800 rounded bg-white text-gray-800 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Save
          </button>
        ) : (
          <div className="px-6 py-1 border border-transparent rounded text-sm text-transparent select-none">Save</div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 overflow-visible">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-4 h-4 cursor-pointer"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-4 w-16">Product</th>
              <th className="p-4 font-normal">Product ID</th>
              <th className="p-4 font-normal">Name</th>
              <th className="p-4 font-normal">Quantity</th>
              <th className="p-4 font-normal">Price</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  {searchQuery || statusFilter !== 'all' ? 'No products match your search criteria.' : 'No products found.'}
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-4 align-middle">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(p.id)}
                      onChange={() => handleSelect(p.id)}
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500 w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="p-4 align-middle">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border border-gray-200" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        📦
                      </div>
                    )}
                  </td>
                  <td className="p-4 align-middle text-gray-500 font-mono text-xs">{p.id.slice(0, 8)}...</td>
                  <td className="p-4 align-middle text-gray-700 font-medium">{p.name}</td>
                  <td className="p-4 align-middle">
                    <input
                      className="w-20 border border-gray-200 rounded px-2 py-1 text-center text-gray-600 focus:outline-none focus:border-gray-400"
                      value={p.quantity}
                      onChange={(e) => handleChange(p.id, 'quantity', e.target.value)}
                    />
                  </td>
                  <td className="p-4 align-middle">
                    <div className="relative w-24">
                      <span className="absolute left-2 top-1 text-gray-400">₹</span>
                      <input
                        className="w-full border border-gray-200 rounded pl-5 pr-2 py-1 text-gray-600 focus:outline-none focus:border-gray-400"
                        value={p.price}
                        onChange={(e) => handleChange(p.id, 'price', e.target.value)}
                      />
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${p.status === 'Active'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : p.status === 'Low Stock'
                          ? 'bg-orange-100 text-orange-700 border-orange-200'
                          : 'bg-red-100 text-red-700 border-red-200'
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-center relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
                      className="p-1 border border-gray-200 rounded hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {openMenuId === p.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)}></div>
                        <div className="absolute right-8 top-8 w-32 bg-white border border-gray-200 rounded shadow-sm z-20 overflow-hidden text-left">
                          <Link to={`/add-product?edit=${p.id}`} className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Edit</Link>
                          <button type="button" onClick={() => handleDelete(p.id, p.name)} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">Delete</button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-500">
          Showing {filteredProducts.length} of {products.length} items
          {(searchQuery || statusFilter !== 'all') && ' (filtered)'}
        </p>
        <div className="text-sm text-gray-500">
          Total Value: {formatCurrency(filteredProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0))}
        </div>
      </div>
    </div>
  )
}
