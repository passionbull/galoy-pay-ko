import { QRCode } from "react-qrcode-logo"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import { getOS, playStoreLink, appStoreLink, apkLink } from "../lib/download"

function NFC() {


  const readNFC = async () =>{
    window.alert('read 1')
    if ("NDEFReader" in window) {
      try {
          const window_:any = window;
          const ndef = new window_.NDEFReader();
          await ndef.scan();
          window.alert('read success')
          console.log("Scan started successfully.");
          ndef.onreadingerror = () => {
              console.log("Cannot read data from the NFC tag. Try another one?");
          };

          ndef.onreading = (event: any) => {
              console.log("NDEF message read.", event);
              window.alert(event);
              // onReading(event); //Find function below
          };
      } catch (error) {
          console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  }

  return (
    <Container>
      <br />
      <h3>NFC test</h3>
      <br />
      <Row>
        <Col>
          <Button onClick={() => {readNFC()}}> 
              볼트카드 결제하기</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default NFC
