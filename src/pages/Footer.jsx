function Footer(){
    return(
        <section id="footer" className="py-5 flex text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex lg:flex-row gap-2 items-center justify-center">
                <h1 className="relative pb-1 font-semibold text-xs sm:text-sm uppercase tracking-wider">Developed By: </h1>
                <a href="https://www.facebook.com/enson.ely" 
                target="_blank" 
                rel="noreferrer" 
                className="relative pb-1 font-semibold text-xs sm:text-sm uppercase tracking-wider
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center 
                after:scale-x-0 after:bg-[#2563EB] after:transition-transform after:duration-300 
                after:pointer-events-none hover:after:scale-x-100">ELY</a>
            </div>
        </section>
    )
}

// after:scale-x-0 after:bg-[#0072bc] after:transition-transform 
export default Footer