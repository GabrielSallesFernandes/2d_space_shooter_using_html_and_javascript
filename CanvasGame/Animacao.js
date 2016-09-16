function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
   this.processamentos = [];
   this.spritesExcluir = [];
   this.processamentosExcluir = [];
   this.ultimoCiclo = 0;
   this.decorrido = 0;
}
Animacao.prototype = {
   newSprite: function(sprite) {
      this.sprites.push(sprite);
      sprite.animacao = this;
   },
   ligar: function() {
      this.ultimoCiclo = 0;
      this.ligado = true;
      this.proximoFrame();
   },
   desligar: function() {
      this.ligado = false;
   },
   proximoFrame: function() {
      // Posso continuar?
      if ( ! this.ligado ) return;

      var agora = new Date().getTime();
      if(this.ultimoCiclo == 0){
         this.ultimoCiclo = agora;
      }
      this.decorrido = agora - this.ultimoCiclo;

      // Atualizamos o estado dos sprites
      for (var i in this.sprites)
         this.sprites[i].atualizar();

      // Desenhamos os sprites
      for (var i in this.sprites)
         this.sprites[i].desenhar();

      //processamentos gerais
      for(var i in this.processamentos)
         this.processamentos[i].processar();

      //processamento de exclusões
      this.processarExclusoes();

      //atualizar o instante do ultimo ciclo
      this.ultimoCiclo = agora;

      // Chamamos o próximo ciclo
      var animacao = this;
      requestAnimationFrame(function() {
         animacao.proximoFrame();
      });
   },
   novoProcessamento: function(processamento){
      this.processamentos.push(processamento);
      processamento.animacao = this;
   },
   excluirSprite: function(sprite){
      this.spritesExcluir.push(sprite);
   },
   excluirProcessamento: function(processamento){
      this.processamentosExcluir.push(processamento);
   },
   processarExclusoes: function(){
      var novoSprotes = [];
      var novoProcessamentos = [];

      //adicionar somente se não constar na array de excluidos
      for(var i in this.sprites){
         if(this.spritesExcluir.indexOf(this.sprites[i]) == -1){
            novoSprotes.push(this.sprites[i]);
         }
      }
      for(var i in this.processamentos){
         if(this.processamentosExcluir.indexOf(this.processamentos[i]) == -1){
            novoProcessamentos.push(this.processamentos[i]);
         }
      }
      //limpar os arrays de exclusões
      this.spritesExcluir = [];
      this.processamentosExcluir = [];

      //substituir os arrays velhos pelos novos
      this.sprites = novoSprotes;
      this.processamentos = novoProcessamentos;
   }
}
