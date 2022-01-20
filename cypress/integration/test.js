import {colors} from "../../src/constants/colors"

describe("jugar memotest", () => { 
    before(() => {
        cy.visit("http://localhost:3000");
    });
    
    /*it("seleccionar cartas iguales",()=>{
        for(let i=0;i<colors.length;i++){
            cy.get(`[data-testid='${colors[i]}']`,{timeout:40000}).click({multiple:true})
        }
    }) 
    */
  it("seleccionar cartas iguales",()=>{
    for(let i=0;i<colors.length;i++){
       cy.clock()
       cy.tick(i*2000)
       cy.get(`[data-testid=${colors[i]}]`).click({multiple:true})
    }
    
  })
  it("reiniciar juego",()=>{
      cy.get("[data-testid='reset']").click()
  })
});

