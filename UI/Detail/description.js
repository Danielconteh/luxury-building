import * as Style from '../../styles/detail/description.module.scss'

const Description = (props) => {
  const data = { ...props }
  
  // const slice = data['description'].slice(50) //throw error!!
  return (
    <>
      <div className={Style.detail_grid_container}>
        <div className={Style.detail_container_items}>
          <div className={Style.detail_container_items__headers__1}>
            <div>brief description</div>
          </div>
          <div className={Style.detail_container_items__headers__2}>
            <div>about {data['name']}</div>
          </div>

          <div className={Style.detail_container_items__detail}>
            <li>
              <span>rooms</span>
              <span>{data['rooms']}</span>
            </li>
            <li>
              <span>living room</span>
              <span>{data['Living room']}</span>
            </li>
            <li>
              <span>dinning room</span>
              <span>{data['dinning room']}</span>
            </li>
            <li>
              <span>study room</span>
              <span>{data['study room']}</span>
            </li>
            <li>
              <span>bathroom</span>
              <span>{data['Bathroom']}</span>
            </li>
            <li>
              <span>kitchen</span>
              <span>{data['Kitchen']}</span>
            </li>
            <li>
              <span>garage</span>
              <span>{data['Garage']}</span>
            </li>
            <li>
              <span>garden shade</span>
              <span>{data['Garden shade']}</span>
            </li>
            <li>
              <span>swimming pool</span>
              <span>{data['swimming pool']}</span>
            </li>
            <li>
              <span>funiture</span>
              <span className={Style.Furniture}>
                (
                {/* {data['Furniture'].slice(2).map((el: String, i: number) => {
                  if (el.length - 1 > i) return el + ', '
                  return el
                })} */}
                )
              </span>
            </li>
            <li>
              <span>decoration</span>
              <span>{data['decoration']}</span>
            </li>
          </div>

          {/* ========================= */}
          <div className={Style.detail_container_items__description}>
            <div>
              <p>{data['description']}</p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                sapiente nihil reiciendis at iure architecto sunt perferendis
                porro unde vel...
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description

// <div>brief description</div>
// <div>
//   <li>
//     <span>rooms</span>
//     <span>{data['rooms']}</span>
//   </li>
//   <li>
//     <span>living room</span>
//     <span>{data['Living room']}</span>
//   </li>
//   <li>
//     <span>dinning room</span>
//     <span>{data['dinning room']}</span>
//   </li>
//   <li>
//     <span>study room</span>
//     <span>{data['study room']}</span>
//   </li>
//   <li>
//     <span>bathroom</span>
//     <span>{data['Bathroom']}</span>
//   </li>
//   <li>
//     <span>kitchen</span>
//     <span>{data['Kitchen']}</span>
//   </li>
//   <li>
//     <span>garage</span>
//     <span>{data['Garage']}</span>
//   </li>
//   <li>
//     <span>garden shade</span>
//     <span>{data['Garden shade']}</span>
//   </li>
//   <li>
//     <span>swimming pool</span>
//     <span>{data['swimming pool']}</span>
//   </li>
//   <li>
//     <span>funiture</span>
//     <span className={Style.Furniture}>
//       (
//       {data['Furniture'].slice(2).map((el, i) => {
//         if (el.length - 1 > i) return el + ', '
//         return el
//       })}
//       )
//     </span>
//   </li>
//   <li>
//     <span>decoration</span>
//     <span>{data['decoration']}</span>
//   </li>
// </div>

// =========================
