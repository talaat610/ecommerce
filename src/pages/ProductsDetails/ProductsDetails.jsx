import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Loader from '../../component/ProductCard/Loader';
import { useQuery } from '@tanstack/react-query';
import CardProductItem from '../../component/ProductCard/ProductCard';
import { useContext } from 'react';
import { cartContext } from '../../component/Context/CartContext';

export default function ProductsDetails() {
const {addProductToCart} = useContext(cartContext)

    let { id } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: (x) => {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.queryKey[1]}`)
        }
    })

    const categoryId = data?.data.data.category._id;
    const { data: relatedProducts } = useQuery({
        queryKey: ['related', categoryId],
        enabled: !!categoryId,     
        queryFn: () =>
            axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in][]=${categoryId}`)
    });

    return (
        <>
            <div className="container">
                {isLoading ? <Loader /> :
                    <div className='grid grid-cols-12 py-10 gap-6'>
                        <div className='col-span-4 relative'>
                            <img src={data?.data.data.imageCover} alt="" />
                            <button className='absolute top-5 right-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                    className="size-8 text-red-400">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597
                                        1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1
                                        3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                            <div className='mt-2'>
                                <Swiper spaceBetween={10} slidesPerView={3}>
                                    {data?.data.data.images.map((img, i) => (
                                        <SwiperSlide key={i}><img src={img} alt="" /></SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        <div className='col-span-8 pt-10 space-y-5'>
                            <div>
                                <h2 className='text-xl'>{data?.data.data.title}</h2>
                                <h3 className='text-xl font-semibold text-primary'>
                                    {data?.data.data.category.name}
                                </h3>
                            </div>
                            <p>{data?.data.data.description.split(' ' , 2).join(' ')}</p>

                            <div className='flex justify-between items-center'>
                                <h4>EG : {data?.data.data.price}</h4>
                                <div className='w-[150px] flex justify-between items-center'>
                                    <h4 className='bg-primary rounded-md p-0.5 text-white'>
                                        Reviews : {data?.data.data.ratingsQuantity}
                                    </h4>
                                    <div className='flex gap-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" strokeWidth={1.5}
                                            stroke="currentColor" className="size-6 text-amber-300">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M11.48 3.499a.562.562 0 0 1
                                                1.04 0l2.125 5.111a.563.563 0 0 0
                                                .475.345l5.518.442c.499.04.701.663.321.988l-4.204
                                                3.602a.563.563 0 0 0-.182.557l1.285
                                                5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562
                                                0 0 0-.586 0L6.982
                                                20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562
                                                0 0 0-.182-.557l-4.204-3.602a.562.562
                                                0 0 1 .321-.988l5.518-.442a.563.563 0 0
                                                0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <h4>{data?.data.data.ratingsAverage}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-3'>
                                <button 
                                className='text-white bg-primary rounded-md px-3 w-full py-1 hover:bg-darkPrimary'>
                                    Pay Now
                                </button>
                                <button 
                                onClick={ ()=>{addProductToCart(data.data.data._id)} }
                                className='bg-gray-300 rounded-md px-3 w-full py-1 hover:bg-gray-400 hover:text-white'>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>}
            </div>

          
            <div className="container">
                <div className='flex flex-col justify-center items-center'>
                <div className='w-[350px] h-1 my-12 bg-primary'></div>
                <h3 className='text-4xl font-extrabold'>Related Products</h3>
                <div className='w-[160px] h-1 my-12 bg-primary'></div>
                </div>

                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 my-10'>
                    {relatedProducts?.data.data.map((item) => (
                        <CardProductItem item={item} key={item._id} />
                    ))}
                </div>
            </div>

    
            <footer className='bg-gray-100 py-10 mt-16'>
                <div className='container text-center text-gray-500'>
                    © {new Date().getFullYear()} Your Store Name. All rights reserved.
                </div>
            </footer>
        </>
    )
}
