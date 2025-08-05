import ProductCard from '../../component/ProductCard/ProductCard'
import axios from 'axios';
import Loader from '../../component/ProductCard/Loader';
import { useQuery } from '@tanstack/react-query';
import HomeSlider from '../../component/HomeSlider/HomeSlider';
import CategorySlider from '../../component/CategorySlider/CategorySlider';



export default function Home() {

let {data , isLoading  , error} = useQuery({
  queryKey:['hambozo'],
  queryFn:()=>{
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
})


  return (
    <>
     <div className="container py-8 space-y-10">


 {/* Home Slider */}
<div className=''>
<HomeSlider/>
</div>
   

{/* Category Slider */}
 <p className='flex justify-center text-2xl font-semibold'>All Categorys</p>
<CategorySlider/>


        {isLoading ? <Loader /> : error ? <h3 className='text-5xl text-red-500 text-center bg-red-300 py-20 rounded-lg max-w-[350px]  mx-auto'>THERE ARE NO PRODUCTS</h3> :
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            {data.data.data.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>}

      </div> 
    </>
  )
}
