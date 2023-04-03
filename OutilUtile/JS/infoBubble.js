var infoBtn = document.getElementById("info-btn");
		var infoBubble = document.getElementById("info-bubble");

		infoBtn.addEventListener("click", function() {
		  if (infoBubble.style.display === "block") {
		    infoBubble.style.display = "none";
		  } else {
		    infoBubble.style.display = "block";
		  }
		});