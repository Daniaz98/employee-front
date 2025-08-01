import EmployeePhoto from "../../components/EmployeePhoto";
import useListEmps from "../../hooks/useListEmps";
import "./styles.modules.css"

const Home = () => {
    const {data: employees, loading, error} = useListEmps();

    if (loading) return <div>Carregando...</div>
    if (error) return <div>Erro: {error}</div>;

    return (
        <div className="text-center">
            <h1>Hello</h1>
            <ul>
                {employees.map((emp) => (
                    <li key={emp.id}>
                        {emp.name} - {emp.email}
                        <EmployeePhoto id={emp.id}/>
                    </li>
                    ))}
            </ul>
        </div>
    )
};

export default Home;