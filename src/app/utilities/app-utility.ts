import { MatDialog } from "@angular/material/dialog";
import { DialogInfosComponent } from "../components/dialogs/dialog-infos/dialog-infos.component";


export class AppUtilitie{

    static openInfoDialog(dialog: MatDialog, message: string){
      dialog.open(DialogInfosComponent, {
        width: "50%",
        data: {
          message: message
        }
      })
    }

    static isStrongPassword(value:string):boolean{
      const asSpecialChar=/[&@*#_]+/,
           asCapitalChar=/[A-Z]+/,
           asLowerChar=/[a-z]+/,
           asNumber=/[0-9]+/;
     return asSpecialChar.test(value) &&
            asCapitalChar.test(value) &&
            asLowerChar.test(value) &&
            asNumber.test(value) &&
            value.length>=8;
    }

    public static print(id: string, style?: string){
      let popupWin: any, printContents: string;
      const section = document.getElementById(`${id}`);
      printContents = section ? section.innerHTML : "";
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            <link rel="stylesheet" href="./../../styles.scss">
            <style>
              ${style}
              .containerbackground {
                margin: 3rem;
                position: absolute;
                top: 0;
                left: 10rem;
                bottom: 0;
                z-index: 2;
                transform: rotate(300deg);
                -webkit-transform: rotate(300deg);
                color: #c6afaf90;
              }
              @page { margin: 0; }
              @media print {
                @page { margin: 0; }
                body { margin: 1.6cm; }
              }
            </style>
          </head>
          <body onload="window.print();">${printContents}</body>
        </html>`
      );
       popupWin.document.close();
    }



}
