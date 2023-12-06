interface Props {
  children: string;
  color: string;
}

function VehicleModel({ children, color }: Props) {
  return (
    <h3 className='text-3xl font-outfit mt-[4px]' style={{ color }}>
      {children}
    </h3>
  );
}
export default VehicleModel;
