// import {useEffect, useState} from "react";
// import {findAllProduct} from "./service/ProductService";
// import 'slider-moon/dist/style.css'
//
// export default function Images() {
//     const [products, setProducts] = useState([]);
//     useEffect(() => {
//         findAllProduct().then((result) => {
//             setProducts(result)
//         })
//     }, [])
//     return (
//         <>
//             {products.map((p) => {
//                 return(
//                     <div id="carouselExampleIndicators" className="carousel slide" style={{width: "200px"}}>
//                         <div className="carousel-indicators">
//                             <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
//                             <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
//                             <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
//                         </div>
//                         <div className="carousel-inner">
//                             {p.image.map((i) => (
//                                 <div className="carousel-item active">
//                                     <img src={i.name} className="d-block w-100" alt="..."/>
//                                 </div>
//                                 ))}
//                         </div>
//                         <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
//                             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                             <span className="visually-hidden">Previous</span>
//                         </button>
//                         <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
//                             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                             <span className="visually-hidden">Next</span>
//                         </button>
//                     </div>
//                 )
//             })}
//
//         </>
//
//     )
//
//
// }