import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './ViolationModal.css';
import { Colors } from "chart.js";


function decodeHtml(string) {
  return string?.replace("&amp;", "&")
                .replace("<br/>", "\n")
                .replace("<br />", "\n")
                .replace("&gt;", ">")
                .replace("&lt;", "<")
                .replace("&ge;", ">=")
                .replace("&le", "<=")
                .replace("&#39;", "'")
                .replace("&#176;", "deg")
}




function ViolationsModal(props) {
  
  var { violation } = props;

  return (
    <div className="modal-container"><div className="modal">


      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal__details"
      >
        <Modal.Header closeButton style={{background: "#fffdd0"}}>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className="modal__title">
              <strong>{violation?.category}</strong>
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: "#fffdd0"}}>

          <h3 className="modal__description">
            <strong>Critcal status:</strong> {decodeHtml(violation?.critical)}
          </h3>
          <h4 className="modal__description">
            <strong>Status:</strong> {decodeHtml(violation?.status)}
          </h4>
          <p className="modal__text">
            <strong>Question:</strong> {decodeHtml(violation?.question)}
          </p>
          <p className="modal__text">
            <strong>Comments:</strong> {decodeHtml(violation?.comments)}
          </p>
        </Modal.Body>
        <Modal.Footer style={{background: "#fffdd0"}}>
          <Button variant="outline-success" className="modal__btn" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div></div>

  );
}

export default ViolationsModal;
