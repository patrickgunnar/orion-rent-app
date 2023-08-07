import useAboutModal from "@/hooks/useAboutModal";
import Modal from "./Modal";
import About from "../About";


const AboutModal = () => {
    // aboutModal
    const aboutModal = useAboutModal()

    // on change modal handler
    const onChangeHandler = (isOpen: boolean) => {
        // if modal is opened
        // close it
        if(isOpen) aboutModal.onClose()
    }

    // render content
    return (
        <Modal
            title="About"
            description="About the OrionRent project."
            isOpen={aboutModal.isOpen}
            onChange={() => onChangeHandler(aboutModal.isOpen)}>
            <About />
        </Modal>
    );
}
 
export default AboutModal;
