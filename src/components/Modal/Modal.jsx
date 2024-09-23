import { IoCloseSharp } from "react-icons/io5";

const Modal = ({modalOpen, setModalOpen, children}) => {
    return (
        // backdrop
        <div 
        className={`fixed inset-0 flex justify-center items-center transition-colors ${modalOpen ? 'visible bg-black/20' : 'invisible'}`}>
            
            {/* modal */}
            <div 
            className={`bg-white rounded-xl shadow p-6 transition-all ${modalOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}>

                <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 p-1 rounded-lg hover:bg-gray-200">
                    <IoCloseSharp size={28} className="hover:text-red-500"></IoCloseSharp>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;