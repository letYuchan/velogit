import { createPortal } from 'react-dom';

interface GrowthStatusModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GrowthStatusModal = ({ showModal, setShowModal }: GrowthStatusModalProps) => {
    if (!showModal) return null;

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return createPortal(
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <div className='w-full max-w-xl rounded-sm bg-background p-6 shadow-xl'>
                <h2 className='mb-4 text-center font-title text-xl font-semibold text-foreground'>
                    My Growth Status
                </h2>
                <div>
                    {/* LV info */}
                    <div></div>
                    {/* category info */}
                    <div></div>
                    {/*  */}
                </div>
                <div className='mt-6 flex w-full flex-nowrap items-center justify-center'>
                    <button
                        className='h-8 rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-backgroundDark/70 active:bg-backgroundDark/70'
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default GrowthStatusModal;
