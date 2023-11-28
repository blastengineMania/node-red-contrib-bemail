import { NodeInitializer } from "node-red";
import { Node, NodeDef } from "node-red";
import {BlastEngine, Mail} from 'blastengine';
interface BlastengineNodeDef extends NodeDef, BlastengineNodeOptions {}

interface BlastengineNodeOptions {
  username: string;
  apikey: string;
  to: string;
  fromname: string;
  fromemail: string;
  subject: string;
  message: string;
}

const nodeInit: NodeInitializer = (RED): void => {
  function SendmailNodeConstructor(
    this: Node,
    config: BlastengineNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    // Initialize the BlastEngine SDK
    new BlastEngine(config.username, config.apikey);
    this.on("input", async (msg, send, done) => {
      const mail = new Mail;
      const params = (Object.keys(msg.payload).length === 0 ? {input: msg.payload} : msg.payload) as {[key: string]: any};
      mail.setSubject(params.subject || config.subject);
      mail.setFrom(params.fromemail || config.fromemail, params.fromname || config.fromname);
      mail.setText(params.message || config.message);
      if (params.cc) mail.addCc(params.cc);
      if (params.bcc) mail.addBcc(params.bcc);
      if (!params.input) params.input = JSON.stringify(params);
      mail.addTo(params.to || config.to, params);
      try {
        await mail.send();
        msg.payload = {
          deliveryId: mail.deliveryId,
        };
        send(msg);
      } catch (e) {
        msg.payload = JSON.parse(e.message);
        send(msg);
      }
      done();
    });
  }

  RED.nodes.registerType("sendmail", SendmailNodeConstructor);
};

export = nodeInit;
