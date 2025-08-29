import EmployeePhoto from "../../components/EmployeePhoto";
import Header from "../../components/Header";
import useListEmps from "../../hooks/useListEmps";
import "./styles.modules.css";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data: employees, loading, error } = useListEmps();
  const navigate = useNavigate();

  const handlePath = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-800">
        <p className="text-2xl font-bold text-fuchsia-500">Carregando...</p>
      </div>
    );
  }
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="text-center p-0 bg-gradient-to-r from-gray-800 to-purple-800 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-8 mt-5 text-white">
        Quadro de Funcionários
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
        {employees.map((emp) => (
          <div
            className="relative bg-white shadow-lg rounded-2xl p-6 w-72 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            key={emp.id}
          >
            <FaRegEye
              onClick={() => handlePath(`/employee/${emp.id}`)}
              className="absolute top-2 right-2 cursor-pointer"
            />
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <EmployeePhoto id={emp.id} />
            </div>
            <h2 className="text-xl font-semibold">{emp.name}</h2>
            <p className="text-gray-500">{emp.email}</p>
            <p className="text-gray-400 text-sm">{emp.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
