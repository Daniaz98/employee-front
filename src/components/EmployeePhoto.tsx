import usePhotoEmp from "../hooks/usePhotoEmp";

const EmployeePhoto = ({ id }: { id: string }) => {
  const { photoBlob, loading, error } = usePhotoEmp(id);

  if (loading) return <p>Carregando foto...</p>;
  if (error) return <p>{error}</p>;
  if (!photoBlob) return null;

  const photoUrl = URL.createObjectURL(photoBlob);

  return <img src={photoUrl} alt="Foto do funcionário" />;
};

export default EmployeePhoto;
