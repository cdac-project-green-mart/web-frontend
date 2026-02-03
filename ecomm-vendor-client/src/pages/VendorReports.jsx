import { useState } from 'react'
import { generateOrdersReport, downloadBlob } from '../api/reports'

// Reports page with API integration
export default function VendorReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Form states
  const [reportType, setReportType] = useState('orders')
  const [fromDate, setFromDate] = useState('2026-01-01')
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0])
  const [format, setFormat] = useState('csv')

  // Schedule states
  const [frequency, setFrequency] = useState('Weekly')
  const [scheduleFormat, setScheduleFormat] = useState('Excel')
  const [emailReport, setEmailReport] = useState(false)

  const handleGenerateReport = async () => {
    if (!reportType) {
      setMessage({ type: 'error', text: 'Please select a report type' })
      return
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      if (reportType === 'orders') {
        const blob = await generateOrdersReport(fromDate, toDate, format)
        const filename = `orders_report_${fromDate}_to_${toDate}.${format}`
        downloadBlob(blob, filename)

        // Add to generated reports list
        const newReport = {
          id: Date.now(),
          name: `Orders Report`,
          dateRange: `${fromDate} - ${toDate}`,
          type: 'Orders',
          format: format.toUpperCase(),
          generatedOn: new Date().toLocaleDateString('en-IN'),
          status: 'Ready'
        }
        setReports(prev => [newReport, ...prev])
        setMessage({ type: 'success', text: 'Report downloaded successfully!' })
      } else {
        setMessage({ type: 'info', text: `${reportType} reports are not yet available.` })
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to generate report' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 font-sans text-gray-800">

      {/* Header Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Download reports or schedule automatic report generation.</p>
      </div>

      {/* Status Message */}
      {message.text && (
        <div className={`border rounded-lg p-4 text-sm ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
          {message.text}
        </div>
      )}

      {/* Generate Reports Controls */}
      <div className="flex flex-wrap items-end gap-3 p-1 rounded-lg">
        <div className="flex flex-col gap-1">
          <select
            className="w-40 px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600 focus:outline-none"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="">Report Type</option>
            <option value="orders">Orders</option>
            <option value="returns">Returns</option>
            <option value="inventory">Inventory</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 mb-2">📅 From</span>
          <input
            type="date"
            className="px-3 py-2 border border-gray-200 rounded text-sm text-gray-600 focus:outline-none"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 mb-2">To</span>
          <input
            type="date"
            className="px-3 py-2 border border-gray-200 rounded text-sm text-gray-600 focus:outline-none"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <select
            className="w-32 px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600 focus:outline-none"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>
        </div>

        <button
          className="px-6 py-2 bg-gray-900 hover:bg-black text-white text-sm rounded transition-colors mb-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGenerateReport}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      {/* Generated Reports Table Section */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <span className="text-blue-500">📥</span> Generated Reports
        </h2>

        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-200">
              <tr>
                <th className="p-4 font-medium">Report Name</th>
                <th className="p-4 font-medium">Date Range</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Format</th>
                <th className="p-4 font-medium">Generated On</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-700">{report.name}</td>
                  <td className="p-4 text-gray-500">{report.dateRange}</td>
                  <td className="p-4 text-gray-500">{report.type}</td>
                  <td className="p-4 text-gray-500">{report.format}</td>
                  <td className="p-4 text-gray-500">{report.generatedOn}</td>
                  <td className="p-4">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="p-4">
                    {report.status === 'Ready' ? (
                      <button className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs hover:bg-green-100 transition-colors">
                        ⬇ Download
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Reports Section */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <span className="text-red-400">⏰</span> Schedule Reports
        </h2>

        <div className="bg-white rounded-lg p-5 ">
          <div className="flex flex-wrap items-center gap-12 mb-6">
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600 font-medium">Frequency</span>
              <select
                className="w-48 px-3 py-2 border border-gray-200 rounded text-sm text-gray-600 bg-white focus:outline-none"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option>Weekly</option>
                <option>Daily</option>
                <option>Monthly</option>
              </select>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600 font-medium">Format</span>
              <select
                className="w-48 px-3 py-2 border border-gray-200 rounded text-sm text-gray-600 bg-white focus:outline-none"
                value={scheduleFormat}
                onChange={(e) => setScheduleFormat(e.target.value)}
              >
                <option>Excel</option>
                <option>CSV</option>
                <option>PDF</option>
              </select>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600 font-medium">Email Report</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-5 h-5 text-gray-800 focus:ring-0 cursor-pointer"
                  checked={emailReport}
                  onChange={(e) => setEmailReport(e.target.checked)}
                />
                <span className="text-sm text-gray-500">Yes, send via email</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-10 py-2.5 bg-gray-100 text-gray-500 text-sm font-medium rounded hover:bg-gray-200 transition-colors border border-gray-200">
              Cancel
            </button>
            <button className="px-10 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-black transition-colors">
              Save Schedule
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Scheduled reports will be emailed automatically on selected frequency.
          </p>
        </div>
      </div>

    </div>
  )
}

function StatusBadge({ status }) {
  if (status === 'Ready') {
    return (
      <span className="px-3 py-1 rounded bg-green-50 text-green-600 border border-green-200 text-xs font-medium">
        Ready
      </span>
    )
  }
  if (status === 'Processing') {
    return (
      <span className="px-3 py-1 rounded bg-purple-50 text-purple-600 border border-purple-200 text-xs font-medium">
        Processing
      </span>
    )
  }
  return (
    <span className="px-3 py-1 rounded bg-gray-50 text-gray-600 border border-gray-200 text-xs font-medium">
      {status}
    </span>
  )
}
