import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const handleClose = () => setIsOpenModal(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((prevState) => !prevState)}>
//         Add New Cabin
//       </Button>

//       {isOpenModal && (
//         <Modal onClose={handleClose}>
//           <CreateCabinForm onCloseModal={handleClose} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
