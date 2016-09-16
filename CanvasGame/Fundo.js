function Fundo(context, image){
	this.context = context;
	this.image = image;
	this.velocidade = 0;
	this.posicaoEmenda = 0;	
}
Fundo.prototype = {
	atualizar: function(){
		this.posicaoEmenda += this.velocidade * this.animacao.decorrido / 1000;

		if(this.posicaoEmenda > this.image.height){
			this.posicaoEmenda = 0;
		}
	},
	desenhar: function(){
		var img = this.image;

		var posY = this.posicaoEmenda - img.height;
		this.context.drawImage(img, 0, posY, img.width, img.height);

		posY = this.posicaoEmenda;
		this.context.drawImage(img, 0, posY, img.width, img.height);
	}

}