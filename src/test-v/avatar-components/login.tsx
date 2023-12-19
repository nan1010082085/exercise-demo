import { defineComponent, ref } from 'vue';
import JSEncrypt from 'jsencrypt';
import { Button } from 'tdesign-vue-next';
import axios from 'axios';

const HomeComponent = defineComponent({
  name: 'HomeComponent',
  setup() {
    const rsa = ref('');
    const getRsaCode = (key: string): string => {
      const pubKey = `-----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnJwaqqfm1uTcnjodsYar
      Qj0I/qHYjWrs2jDZooV9jqQnQMlev3R8d0OfxL15Tlq8dl65iCIkvutdxmoa/uJ6+
      vlO2yHfFrHgo67TmMOKhv/Zel4FWBvMLalrChAQOvQDAU3lXaVoCswwCPXvCmW4Jtc/tKbvzgReuQvC2nepy4eP0KIFuuNYTd79GKsmwAbFHTla0s6f/zux/uyRNw4i4+bKfxNxNRaC8fkbiM8uLsuLY8G4I7iIEbKHqQ5Y23M+/+qnIMSqAc0vQcph03N9gmHZtciy5o7vgv7oz0GqqX2kvjxYTk1XNr3uj0mWzxKoXzXp4F8+vSuzPBv5cBW70wIDAQAB
      -----END PUBLIC KEY-----`; // 引用 rsa 公钥
      const encryptStr = new JSEncrypt();
      encryptStr.setPublicKey(pubKey); // 设置 加密公钥
      const data = encryptStr.encrypt(key.toString()); // 进行加密
      console.log(data);
      rsa.value = data as string;
      return data as string;
    };

    const login = () => {
      const data = {
        userName: getRsaCode('znzcml'),
        passWord: getRsaCode('Avatar12#$')
      };
      axios.post('/sys/userrole/loginCheck', data).then((res) => {
        console.log(res);
        document.cookie = `authorization=${res.data}`;
      });
    };

    const send = () => {
      const data = {
        oldPassWord: getRsaCode('Avatar12#$'),
        passWord: getRsaCode('Avatar112#$'),
        userId: '1H4IYhKOjfeHCFDtYNgzb0',
        userName: getRsaCode('znzcml')
      };

      axios.post('/sys/userrole/updateUser', data).then((res) => {
        console.log(res);
      });
    };

    const decryptByRSA = (rsaDta: string): string => {
      const PRIVATE_KEY = `-----BEGIN PUBLIC KEY-----
      MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcnBqqp+bW5Nye
      Oh2xhqtCPQj+odiNauzaMNmihX2OpCdAyV6/dHx3Q5/EvXlOWrx2XrmIIiS+613Gahr
      +4nr6+U7bId8WseCjrtOYw4qG/9l6XgVYG8wtqWsKEBA69AMBTeVdpWgKzDAI9e8KZ
      bgm1z+0pu/OBF65C8Lad6nLh4/QogW641hN3v0YqybABsUdOVrSzp//O7H+7JE3Di
      Lj5sp/E3E1FoLx+RuIzy4uy4tjwbgjuIgRsoepDljbcz7/6qcgxKoBzS9BymHTc32
      CYdm1yLLmju+C/ujPQaqpfaS+PFhOTVc2ve6PSZbPEqhfNengXz69K7M8G/lwFbvT
      AgMBAAECggEAZCFy81Xyw8cEP65MuequqOU5UQTN3m1VDpRZMg5DnuXZqxSVHbgut
      FpqVnIGk1B0WwJpgV7DO8Zk6K2CoSDRHJI2FulrJ6mHRWBMLcooUfRXamOe6xyqy
      S8fHwnyNp85JKZXVi6hfPXcaH5F3dH3ke3h73EktgYZQhsA9Im56ES9ezuipKaUO
      I8C41JJCKnNAdl1sWg1QnKumB2/UnHDAWW/JDpY87LpDuGVcfaTfQGCRJUcyF2Hd
      yo4sWJeS5hVv6aKXJ4KS1TGdZdB1s88vCDKYGB4VWOrSl1G3nACYa1QwT8x014lT
      iaABhdGqqBF+vS7h1eRpI2FpgetZ6ezUQKBgQDZ5SGyOnQ3j0uMsQEuivBzDcTBY
      pMcY9jrSNpmhokRH/sP/Ts43F7CGO+YDZoI7C2WVzKURYKxznUd2V0hY2OLxOkzlxs
      ycwAO73VH3SW4QXX+ebkLNmytJkLCbkTUn0nyRg4Rh29SKpa1PtnKybybj5Pqqd2Ub
      vmW6XB1MW+R5QKBgQC3/1BLSe4Qzc40HUrBzXowN0Y4CRrWIUgoKjwbEo7u+ITahWdI9
      s7RcUUEoGPNDczrUnrfaIC9ihZmIsM93Bglvzadteqsl5FmsELyjjQjS3gddFMM9biP
      kuX0rHu/7OcU2nI4Prk2RqWOD73PgPyN8i8JqOG5lBTLylKKlygbVwKBgCJO6KpWd9wT
      rPKfIC+C4u9KuLM2YTF0K0CIvRKtlkFjBrXyynNeh3EKWhdX9Ov4vAjS+/zKoRR8DIbB
      pd9O9eqY+5sK7NZZsyWm4JGLKZhEfl6uLcutKxlsT9Crah0MY6lJDIgICigm2on5NnOu
      pgrcZY7qZiAsBRKU+QcK3KVdAoGBAIHZ6iWoIB210L+QqJCLXZ8ncyPasRjLViwaWl7U
      wxC9TK0XFqQ0ohLHeGjidGxjP+oXRGXkT270RAiCof1HFbeV8YpttxdkxBWPcT/SwdLi
      0Psge/gadczFZAo/q/nvy8k4vQEaqwU16GKQk2kc45+dejq798lLSz3jJEtwj7pzAoGA
      O5b+GGnSNy8WK8CpcC0ehpSV8jQQrilmdyVpObqUIhkyAov4q4+SSoz3F3ZJdlRsNM4E
      5cpSjiLwUFg8YXZ2bcQ71xMq6Ps4tlXS38/KuyReI6Dh2N1keFFkO4Mu9vn+TDozNQql+xN9kfK/TdeOyQo5ZCR1+qysZEjCmVP35j0=
      -----END PUBLIC KEY-----`;
      const decryptor = new JSEncrypt(); // 新建JSEncrypt对象
      decryptor.setPrivateKey(PRIVATE_KEY); // 设置私钥
      const data = decryptor.decrypt(rsaDta); // 进行解密
      console.log(data);
      return data as string;
    };

    return () => {
      return (
        <div class={styles.wrapper}>
          <Button onClick={() => login()}>登陆</Button>
          <Button onClick={() => send()}>加密</Button>
          <Button onClick={() => decryptByRSA(rsa.value)}>解密</Button>
        </div>
      );
    };
  }
});

export default HomeComponent;
