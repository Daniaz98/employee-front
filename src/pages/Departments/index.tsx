import { useState } from "react";
import Header from "../../components/Header";
import useDepartments from "../../hooks/useDepartments";

export default function Departments() {
  const { data, loading } = useDepartments();
  const [showEmp, setShowEmp] = useState(new Set());

  const toggleDepartment = (deptName: any) => {
    const newExpand = new Set(showEmp)
    if (newExpand.has(deptName)) {
        newExpand.delete(deptName)
    } else {
        newExpand.add(deptName)
    }
    setShowEmp(newExpand)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-800">
        <p className="text-2xl font-bold text-emerald-500">Carregando...</p>
      </div>
    );
  }

 return (
    <div className="text-center p-0 bg-gradient-to-r from-gray-900 to-emerald-900 min-h-screen">
      <Header />
      <div className="text-center mt-5 text-lg text-gray-300">
        <h1 className="text-3xl font-semibold mb-8">Departamentos</h1>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {data.map((dept) => (
          <div 
            key={dept.department} 
            className="bg-gray-800 rounded-lg shadow-lg mb-6 p-6 border border-gray-700 hover:border-emerald-500 transition-colors"
          >
            <div className="border-b border-gray-600 pb-4 mb-4">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-750 rounded-md p-2 transition-colors"
                onClick={() => toggleDepartment(dept.department)}
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-2 text-left">
                    {dept.department}
                  </h2>
                  <div className="text-sm text-gray-400 text-left">
                    <span>Total de funcionários: {dept.employees?.length || 0}</span>
                  </div>
                </div>
                
                <div className="ml-4">
                  <svg 
                    className={`w-6 h-6 text-emerald-400 transition-transform duration-200 ${
                      showEmp.has(dept.department) ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {dept.employees && showEmp.has(dept.department) ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-3 text-left">
                  Funcionários
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dept.employees.map((employee: any) => (
                    <div 
                      key={employee.id}
                      className="bg-gray-700 rounded-md p-4 border border-gray-600 hover:bg-gray-650 transition-colors"
                    >
                      <div className="text-left">
                        <h4 className="font-semibold text-white mb-1">
                          {employee.name}
                        </h4>
                        <p className="text-emerald-400 text-sm mb-2">
                          {employee.email}
                        </p>
                        <p className="text-gray-400 text-xs">
                          📍 {employee.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 italic text-center py-4">
                Clique para expandir
              </div>
            )}
          </div>
        ))}
        
        {data.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            <p className="text-xl">Nenhum departamento encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
