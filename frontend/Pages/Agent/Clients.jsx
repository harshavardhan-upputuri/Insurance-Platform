import React from 'react'
import { clients } from '../../Assets/assets'

const tableHeaders = [
  { id: 0, label: "Id" },
  { id: 1, label: "Name" },
  { id: 2, label: "Age" },
  { id: 3, label: "Gender" },
  { id: 4, label: "City" },
  { id: 5, label: "Mobile" },
  { id: 6, label: "Policies" },
  { id: 7, label: "Agent ID" },
  { id: 8, label: "Created At" },
  { id: 9, label: "Status" }
];

const Clients = () => {
  return (
    <div className="overflow-x-auto m-4">
      <h2 className='w-[250px] m-4 font-bold text-[22px] mx-auto'>Clients & Policy Details</h2>
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header.id} className="px-4 py-2 border text-left">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((client, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{client.id}</td>
              <td className="px-4 py-2 border">{client.name}</td>
              <td className="px-4 py-2 border">{client.age}</td>
              <td className="px-4 py-2 border">{client.gender}</td>
              <td className="px-4 py-2 border">{client.city}</td>
              <td className="px-4 py-2 border">{client.mobile}</td>
              <td className="px-4 py-2 border">
                <select className="w-full border rounded px-2 py-1 bg-white">
                  <option value="">Select</option>
                  {client.policies.map((policy, i) => (
                    <option key={i} value={policy}>{policy}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2 border">{client.agentId}</td>
              <td className="px-4 py-2 border">{client.createdAt}</td>
              <td className="px-4 py-2 border">{client.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Clients
