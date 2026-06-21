function Footer(){
    return(
        <section id="footer" className="py-5 text-white flex text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex lg:flex-row gap-2 text-white items-center justify-center">
                <a href="https://www.facebook.com/enson.ely" 
                target="_blank" 
                rel="noreferrer" 
                className="relative pb-1 text-[#0072bc] font-semibold text-xs sm:text-sm uppercase tracking-wider
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center 
                after:scale-x-0 after:bg-[#0072bc] after:transition-transform after:duration-300 
                after:pointer-events-none hover:after:scale-x-100">Renelyn Enson</a>
            </div>
        </section>
    )
}

export default Footer