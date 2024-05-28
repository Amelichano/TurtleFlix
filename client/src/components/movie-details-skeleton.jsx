function MovieDetailsSkeleton() {
    return (
        <div className="container mx-auto mt-6">
            <div className="animate-pulse">
                <div className="p-4 border border-gray-300 rounded-lg shadow-lg">
                    <div className="flex flex-row">
                        <div className="w-1/3">
                            <div className="h-full w-full bg-gray-300" />
                        </div>
                        <div className="w-2/3 pl-4">
                            <h1 className="mb-2 text-2xl font-semibold text-blue-gray-900">&nbsp;</h1>
                            <p className="mb-4 text-base font-light">&nbsp;</p>
                            <p className="mb-4 text-base font-light">&nbsp;</p>
                            <div className="mb-4 flex items-center">
                                <strong className="mr-2">&nbsp;</strong>
                                <span className="ml-2 text-base font-light">&nbsp;</span>
                                <span className="ml-2 text-base font-light">&nbsp;</span>
                            </div>
                            <p className="mb-2 text-base font-light">
                                <strong>&nbsp;</strong>
                            </p>
                            <p className="mb-2 text-base font-light">
                                <strong>&nbsp;</strong>
                            </p>
                            <p className="mb-2 text-base font-light">
                                <strong>&nbsp;</strong>
                            </p>
                            <p className="mb-2 text-base font-light">
                                <strong>&nbsp;</strong>
                            </p>
                            <p className="mb-2 text-base font-light">
                                <strong>&nbsp;</strong> 
                            </p>
                            <p className="mb-2 text-base font-light">
                                <strong>&nbsp;</strong>
                            </p>
                            <div className="flex gap-4 mt-4">
                                <a>&nbsp;</a>
                                <a>&nbsp;</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold text-blue-gray-900 mb-4">&nbsp;</h2>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsSkeleton