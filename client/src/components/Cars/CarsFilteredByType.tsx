import { useParams } from "next/navigation"

const CarsFilteredByType = () => {
    const params = useParams<{ type:string }>()
  return (
    <div>
      
    </div>
  )
}

export default CarsFilteredByType
