
		const motif_action_creation = [202, 239, 205, 242]; 
		const secteurs = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
		const num_cel = "'CLI'";

		var res ="";
		for (let i = 0; i < motif_action_creation.length; i++) {
			for (let j = 0; j < secteurs.length; j++) {
				res += "insert into deduction_cel_int (ID_MOTIF_ACTION_CREATION, NUM_CEL, ID_SECTEUR, ID_TRAITE_JURIDIQUE) values ("+motif_action_creation[i]+", "+num_cel+", "+secteurs[j]+", null);" +"<br>";
			}
		}
		document.write(res);

