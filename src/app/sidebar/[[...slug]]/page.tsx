const ExamplePage = ({ params }: { params: { slug: string } }) => {
    return (
        <div className="h-screen w-full flex justify-center items-center uppercase text-3xl font-bold">
            {params.slug ?? "home"}
        </div>
    );
};

export default ExamplePage;
