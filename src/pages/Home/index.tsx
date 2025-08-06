import EmployeePhoto from "../../components/EmployeePhoto";
import Header from "../../components/Header";
import useListEmps from "../../hooks/useListEmps";
import "./styles.modules.css"

const Home = () => {
    const {data: employees, loading, error} = useListEmps();

    if (loading) return <div>Carregando...</div>
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className="text-center">
            <Header/>
            <h1>Funcionários</h1>
            <div className="">
                <ul>
                {employees.map((emp) => (
                    <li className="flex items-center gap-4 mb-4" key={emp.id}>
                        {emp.name} - {emp.email}
                        <div className="w-24 h-24 object-cover rounded">
                            <EmployeePhoto id={emp.id}/>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Home;