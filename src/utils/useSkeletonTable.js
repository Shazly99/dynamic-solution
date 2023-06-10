import { Player } from "@lottiefiles/react-lottie-player";

const useSkeletonTable = () => {
    const SkeletonTable = () => {
        return (
            <>
                <Player
                    className="notfound-image"
                    src='https://assets5.lottiefiles.com/packages/lf20_l9bcfk19.json'
                    autoplay
                    loop
                />
            </>
        )
    }
    return {
        SkeletonTable,
    }
}


export default useSkeletonTable;
