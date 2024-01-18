
    const urlParams = new URLSearchParams(window.location.search);
    const apiKey = urlParams.get('key');
    
    const videoUrl = sessionStorage.getItem('videoUrl');
    const videoTitle = sessionStorage.getItem('videoTitle');
    const pageTitle = document.title = videoTitle;
    
if (pageTitle == null){
  document.title = "Play Video";
}
    
if (videoUrl) {
const videoPlayer = document.getElementById('playVideo');
    videoPlayer.src = videoUrl;
    videoPlayer.addEventListener('loadedmetadata', function() {
        videoPlayer.play();
    });
} else {
  console.error('No video URL found in sessionStorage');
  const mainElement = document.querySelector('main.container');
  if (mainElement) {
    mainElement.style.display = 'none';  // Menyembunyikan elemen main
  }
}

    
   if (apiKey === 's1m0ntox') {
        // Load video list from JSON for the specified key
        const apiUrl = 'https://raw.githubusercontent.com/AgungDevlop/Viral/main/Video.json';
        let videos = [];
        let currentPage = 1;
        const videosPerPage = 10;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            videos = data.reverse(); // Reverse the order of videos
            loadVideos(currentPage);
            renderPageNumbers();
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function loadVideos(page) {
        const start = (page - 1) * videosPerPage;
        const end = start + videosPerPage;
        const currentVideos = videos.slice(start, end);
        const playlistContainer = document.getElementById('videoPlaylist');
        playlistContainer.innerHTML = '';

        currentVideos.forEach(video => {
            const videoTitle = video.Judul;
            const videoUrl = video.Url;
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-thumbnail', 'relative');
            videoElement.innerHTML = `
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h2 class="text-xl font-bold mb-2">${videoTitle}</h2>
                    <div class="aspect-w-16 aspect-h-9 relative">
                        <div class="loading-overlay">
                            <div class="loading-placeholder"></div>
                        </div>
                        <video id="data-video" class="w-full h-40 object-cover" preload="metadata" onloadedmetadata="captureThumbnail(this)">
                            <source src="${videoUrl}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="flex justify-between mt-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onclick="playVideo('${videoUrl}', '${videoTitle}')">
                            Play Video
                        </button>
                        <a href="${videoUrl}" target="_blank" rel="noopener noreferrer"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Download
                        </a>
                    </div>
                </div>
            `;
            playlistContainer.appendChild(videoElement);
        });

        document.getElementById('prevPage').classList.toggle('hidden', currentPage === 1);
        document.getElementById('nextPage').classList.toggle('hidden', end >= videos.length);
    }
    
    function renderPageNumbers() {
    const totalPages = Math.ceil(videos.length / videosPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = ''; // Clear existing page numbers

    const maxVisiblePages = 3; // Set the maximum visible page numbers
    const displayedPages = [];

    // Calculate the range of pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages <= maxVisiblePages) {
        // If total pages are less than or equal to maxVisiblePages, display all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // Ensure the current page is centered if not at the beginning or end
        if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
            endPage = maxVisiblePages;
        } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
            startPage = totalPages - maxVisiblePages + 1;
        }
    }

    if (startPage > 1) {
        const firstPage = document.createElement('button');
        firstPage.innerText = '1';
        firstPage.classList.add('mx-1', 'px-3', 'py-1', 'rounded', 'hover:bg-indigo-700', 'hover:text-white');
        firstPage.addEventListener('click', function () {
            currentPage = 1;
            loadVideos(currentPage);
            renderPageNumbers();
        });
        pageNumbers.appendChild(firstPage);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        displayedPages.push(i);
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('mx-1', 'px-3', 'py-1', 'rounded', 'hover:bg-indigo-700', 'hover:text-white');
        if (i === currentPage) {
            button.classList.add('bg-indigo-500', 'text-white');
        } else {
            button.classList.add('bg-gray-300', 'text-gray-600');
        }
        button.addEventListener('click', function () {
            currentPage = i;
            loadVideos(currentPage);
            renderPageNumbers();
        });
        pageNumbers.appendChild(button);
    }

    if (endPage < totalPages) {
        if (totalPages - endPage >= 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }

        const lastPage = document.createElement('button');
        lastPage.innerText = totalPages;
        lastPage.classList.add('mx-1', 'px-3', 'py-1', 'rounded', 'hover:bg-indigo-700', 'hover:text-white');
        lastPage.addEventListener('click', function () {
            currentPage = totalPages;
            loadVideos(currentPage);
            renderPageNumbers();
        });
        pageNumbers.appendChild(lastPage);
    }
}

  } else {
        console.error('Invalid or missing API key');
        // Handle the case where the API key is invalid or missing
    }

    if (videoUrl && videoTitle) {
    const videoPlayer = document.getElementById('playVideo');
    videoPlayer.src = videoUrl;
    videoPlayer.addEventListener('loadedmetadata', function() {
        videoPlayer.play();
    });
   document.getElementById('videoTitle').innerHTML= videoTitle;

} else {
    console.error('No video URL and title found in sessionStorage');
    const mainElement = document.querySelector('main.container');
    if (mainElement) {
        mainElement.style.display = 'none';  // Menyembunyikan elemen main
    }
}



    function playVideo(videoUrl, videoTitle) {
    sessionStorage.setItem('videoUrl', videoUrl);
    sessionStorage.setItem('videoTitle', videoTitle);
    window.location.href = ''
    }

    function captureThumbnail(video) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const duration = video.duration;
        const middleTime = duration / 2;
        const currentTime = video.currentTime;
        video.removeAttribute('autoplay');
        video.currentTime = middleTime;
        setTimeout(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.currentTime = currentTime;
            video.setAttribute('poster', canvas.toDataURL('image/jpeg'));
            video.parentElement.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    }

    document.getElementById('searchButton').addEventListener('click', function() {
        filterVideos();
    });

    function filterVideos() {
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const videoThumbnails = document.querySelectorAll('.video-thumbnail');
        let found = false;
        videoThumbnails.forEach(thumbnail => {
            const titleElement = thumbnail.querySelector('h2');
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(searchValue)) {
                thumbnail.style.display = 'block';
                found = true;
            } else {
                thumbnail.style.display = 'none';
            }
        });
        document.getElementById('noResults').style.display = found ? 'none' : 'block';
    }

    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            loadVideos(currentPage);
            renderPageNumbers();
        }
    });


    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(videos.length / videosPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadVideos(currentPage);
            renderPageNumbers();
        }
    });
   
   document.addEventListener('DOMContentLoaded', function() {
  // Ambil elemen video
  var videoElement = document.getElementById('video-id');


 
});

var myFP = fluidPlayer(
        'video-id',	{
	"layoutControls": {
		"controlBar": {
			"autoHideTimeout": 3,
			"animated": true,
			"autoHide": true
		},
		"htmlOnPauseBlock": {
			"html": null,
			"height": null,
			"width": null
		},
		"autoPlay": false,
		"mute": true,
		"allowTheatre": true,
		"playPauseAnimation": false,
		"playbackRateEnabled": false,
		"allowDownload": true,
		"playButtonShowing": false,
		"fillToContainer": false,
		"posterImage": ""
	},
	"vastOptions": {
		"adList": [
			{
				"roll": "preRoll",
				"vastTag": "https://majorcharacter.com/dbm/Fnz.daG-NkvYZVGqUB/-eSmq9Ou/ZCUnlkkKP/T/UIxNMSjHYqwfN/TnQvtoN/TREFyXN-jJA/1pNNQr",
				"adText": ""
			},
			{
				"roll": "midRoll",
				"vastTag": "https://majorcharacter.com/dbm/Fnz.daG-NkvYZVGqUB/-eSmq9Ou/ZCUnlkkKP/T/UIxNMSjHYqwfN/TnQvtoN/TREFyXN-jJA/1pNNQr",
				"adText": ""
			}
		],
		"adCTAText": false,
		"adCTATextPosition": ""
	}
});
 
const currentYear = new Date().getFullYear();
    document.getElementById('copyrightText').textContent = `© Copyright By Simontok Indo ${currentYear}`;
    document.getElementById('title').textContent = `Simontok ${currentYear}`;
  
