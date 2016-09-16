function Spritesheet(context, image, linhas, colunas) { 
   this.context = context; 
   this.image = image; 
   this.numLinhas = linhas; 
   this.numColunas = colunas; 
   this.intervalo = 0; 
   this.linha = 0; 
   this.coluna = 0; 
   this.fimDoCiclo = null;
} 
Spritesheet.prototype = { 
   proximoQuadro: function() {
      var agora = new Date().getTime(); 

      // Se ainda não tem último tempo medido 
      if (! this.ultimoTempo) this.ultimoTempo = agora; 

      // Já é hora de mudar de coluna? 
      if (agora - this.ultimoTempo < this.intervalo) return;

      if (this.coluna < this.numColunas - 1) {
         this.coluna++; 
      }
      else {
         this.coluna = 0;
       //avisar que acabou o ciclo
       if (this.fimDoCiclo) {
         this.fimDoCiclo();
       }
      }
      // Guardar hora da última mudança
      this.ultimoTempo = agora;

   },
   desenhar: function(x, y) {
      var largura = this.image.width / this.numColunas; 
      var altura = this.image.height / this.numLinhas; 

      this.context.drawImage( 
         this.image, 
         largura * this.coluna, 
         altura * this.linha, 
         largura, 
         altura, 
         x, 
         y, 
         largura, 
         altura 
      ); 
   }
}