import "./loading.css"
import zelebober from "../../assets/ZeleBober.svg"


export default function Loading() {

    return(
        <>
            <div className="loading-container">
                <img src={zelebober} alt="" />
            </div>
        </>
    )

}