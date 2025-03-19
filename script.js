// Breed List Page Logic
if (window.location.pathname.includes('breed.html')) {
	const breedSelect = document.getElementById('breed-select');
	const breedImageContainer = document.getElementById('breed-image-container');

	// Fetch the list of breeds from the Dog API
	async function fetchBreeds() {
		try {
			const response = await fetch('https://dog.ceo/api/breeds/list/all');
			const data = await response.json();
			const breeds = Object.keys(data.message); // Extract breed names

			// Populate the dropdown with breeds
			breeds.forEach((breed) => {
				const option = document.createElement('option');
				option.value = breed;
				option.textContent = breed;
				breedSelect.appendChild(option);
			});
		} catch (error) {
			console.error('Error fetching breeds:', error);
		}
	}

	// Fetch and display an image of the selected breed
	async function fetchBreedImage(breed) {
		try {
			const response = await fetch(
				`https://dog.ceo/api/breed/${breed}/images/random`
			);
			const data = await response.json();

			// Create an image element
			const breedImage = document.createElement('img');
			breedImage.src = data.message;
			breedImage.alt = `Image of ${breed}`;

			// Standardize image size
			breedImage.style.width = '300px';
			breedImage.style.height = '300px';
			breedImage.style.objectFit = 'cover';

			// Clear previous image and display the new one
			breedImageContainer.innerHTML = '';
			breedImageContainer.appendChild(breedImage);
		} catch (error) {
			console.error('Error fetching breed image:', error);
		}
	}

	// Event listener for breed selection
	breedSelect.addEventListener('change', (event) => {
		const selectedBreed = event.target.value;
		if (selectedBreed) {
			fetchBreedImage(selectedBreed);
		} else {
			// Clear image if no breed is selected
			breedImageContainer.innerHTML = '';
		}
	});

	// Fetch breeds when the page loads
	fetchBreeds();
}

// Random Dog Page Logic (unchanged)
if (window.location.pathname.includes('random.html')) {
	const fetchDogButton = document.getElementById('fetch-dog');
	const dogImageContainer = document.getElementById('dog-image-container');

	fetchDogButton.addEventListener('click', async () => {
		try {
			const response = await fetch('https://dog.ceo/api/breeds/image/random');
			const data = await response.json();

			const dogImage = document.createElement('img');
			dogImage.src = data.message;
			dogImage.alt = 'Random Dog';

			dogImage.style.width = '300px';
			dogImage.style.height = '300px';
			dogImage.style.objectFit = 'cover';

			dogImageContainer.innerHTML = '';
			dogImageContainer.appendChild(dogImage);
		} catch (error) {
			console.error('Error fetching dog image:', error);
		}
	});
}

// Fun Dog-Themed Page Logic (unchanged)
if (window.location.pathname.includes('fun.html')) {
	const generateNameButton = document.getElementById('generate-name');
	const dogNameElement = document.getElementById('dog-name');

	const dogNames = [
		'Buddy',
		'Max',
		'Bella',
		'Charlie',
		'Lucy',
		'Cooper',
		'Daisy',
		'Rocky',
	];

	generateNameButton.addEventListener('click', () => {
		const randomName = dogNames[Math.floor(Math.random() * dogNames.length)];
		dogNameElement.textContent = randomName;
	});
}
