import HorizontalScroll from "./components/horizontal-scroll";

const HorizontalScrollPage = () => {
    return (
        <>
            <div className="bg-foreground">
                <div className="flex h-[100vh] items-center justify-center">
                    <p className="font-bold uppercase text-primary-foreground">
                        Scroll down
                    </p>
                </div>
                <HorizontalScroll />
                <div className="flex h-[100vh] items-center justify-center">
                    <p className="font-bold uppercase text-primary-foreground">
                        Scroll up
                    </p>
                </div>
            </div>
        </>
    );
};

export default HorizontalScrollPage;
