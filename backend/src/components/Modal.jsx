import { ImCross } from "react-icons/im";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
            <div className={`relative bg-white flex flex-col shadow-lg rounded-lg overflow-hidden`}>
                {!hideHeader && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
                    </div>
                )}

                <button type="button" className="bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm h-8 w-8 flex justify-center items-center top-3.5 right-3.5 absolute cursor-pointer" onClick={onClose}>
                    <ImCross className="w-4 h-4" />
                </button>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
