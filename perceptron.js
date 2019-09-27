class Perceptron{
	constructor(eta=0.01, n_iter=10) //eta is just a scaling factor
	{
		this.eta = eta;
		this.n_iter = n_iter;

		this.num_X_rows = X.length; //how many rows ? - number of elements in X
		this.num_X_cols = X[0].length; //how many columns? - if multi dimensional - then number of elements in the 0th position of original array

	}

	fit(X, y)
	{
		this.w_ = new Array(1 + this.num_X_cols).fill(Math.random()*50); //initially assign w array as [0,0,0] - column array
		this.errors_ = [];

		for (var iter = 0; iter < this.n_iter; iter++)
		{
			for(var j = 0; j < this.num_X_rows; j++)  //for all samples
			{
				
				var update = 0;
				update = this.eta * (y[j] - this.predict(X[j]));

				//console.log(this.predict(X[j]));
				//console.log("Update at iter "+ iter + " = " + update);
				
				this.w_[0] += update; // w + delta(w)
				for(var k = 1; k < this.num_X_cols + 1; k++)
				{
					this.w_[k] += update* X[j][k-1] ; //updated weight vector //here the equation completes of delta_w as explained in the notes
				}

			}
			console.log(this.w_[0] + ", " + this.w_[1] + ", " + this.w_[2]); //display the elements of w vector 
		}
	}

	// Return the dot product between xi and weights
	// Python : return np.dot(xi, self.w_[1:]) + self.w_[0])
	net_input(xi)
	{
		// Dot product
		var sum = 0;
		for(var i = 0; i < this.num_X_cols; i++){
			sum += xi[0,i] * this.w_[i+1];   //just a number (as w^T * x) explained in the notes
		}
		sum += this.w_[0];
		
		//console.log("Dot :" + sum);
		return sum; 
	}

	// Threshold Function
	predict(xi){
		if(this.net_input(xi) >= 0.0){
			return 1;
		}
		else{
			return -1;
		}
	}
}
