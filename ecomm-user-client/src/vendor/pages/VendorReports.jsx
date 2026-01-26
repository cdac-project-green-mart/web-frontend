import { useState } from 'react'

const MOCK_REPORTS = [
  {
    id: 1,
    name: 'All Orders Report',
    dateRange: '01-05 Oct 2025',
    type: 'Orders',
    format: 'CSV',
    generatedOn: '06 Oct 2025',
    status: 'Ready',
  },
  {
    id: 2,
    name: 'Returned Orders Report',
    dateRange: '01-05 Oct 2025',
    type: 'Returns',
    format: 'Excel',
    generatedOn: '06 Oct 2025',
    status: 'Processing',
  },
]

export default function VendorReports() {
  const [reports, setReports] = useState(MOCK_REPORTS)

  // Form states
  const [reportType, setReportType] = useState('')
  const [fromDate, setFromDate] = useState('2025-10-01')
  const [toDate, setToDate] = useState('2025-10-05')
  const [format, setFormat] = useState('')

  // Schedule states
  const [frequency, setFrequency] = useState('Weekly')
  const [scheduleFormat, setScheduleFormat] = useState('Excel')
  const [emailReport, setEmailReport] = useState(false)

  return (
    <div className="space-y-8 font-sans text-gray-800">

      {/* Header Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Download reports or schedule automatic report generation.</p>
      </div>

      {/* Generate Reports Controls */}
      <div className="flex flex-wrap items-end gap-3 bg-white p-1 rounded-lg">
        <div className="flex flex-col gap-1">
          {/* Label placeholders if needed, assuming implicit labeling or alignment */}
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
            <option value="">Format</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <select
            className="w-40 px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600 focus:outline-none"
          >
            <option>Generate Now</option>
            <option>Schedule for Later</option>
          </select>
        </div>

        <button className="px-6 py-2 bg-gray-900 hover:bg-black text-white text-sm rounded transition-colors mb-[1px]">
          Apply
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

        <div className="bg-white rounded-lg p-0">
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Frequency</span>
              <select
                className="w-40 px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 focus:outline-none"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option>Weekly</option>
                <option>Daily</option>
                <option>Monthly</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Format</span>
              <select
                className="w-40 px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 focus:outline-none"
                value={scheduleFormat}
                onChange={(e) => setScheduleFormat(e.target.value)}
              >
                <option>Excel</option>
                <option>CSV</option>
                <option>PDF</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Email Report</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-4 h-4 text-blue-600 focus:ring-blue-500"
                  checked={emailReport}
                  onChange={(e) => setEmailReport(e.target.checked)}
                />
                <span className="text-sm text-gray-500">Yes, send via email</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-gray-900 text-white text-sm rounded hover:bg-black transition-colors">
              Save Schedule
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-400">
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
