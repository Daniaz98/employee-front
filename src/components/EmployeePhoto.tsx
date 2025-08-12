import usePhotoEmp from "../hooks/usePhotoEmp";
import { AiOutlineQuestion } from "react-icons/ai";

const EmployeePhoto = ({ id }: { id: string }) => {
  const { photoBlob, loading, error } = usePhotoEmp(id);

  if (loading) return <p>Carregando foto...</p>;
  if (error) return <p>{error}</p>;
   if (!photoBlob) {
    return <AiOutlineQuestion size={90} style={{ color: '#666' }} />;
  }

  const photoUrl = URL.createObjectURL(photoBlob);

  return <img src={photoUrl} alt="Foto do funcionário" />;
};

export default EmployeePhoto;
