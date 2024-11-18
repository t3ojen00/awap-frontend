class Movie {
#id
#title
#genres
#length
#theatre
#auditorium
#presentationMethod
#spokenLanguage
#subtitleLanguage
#ratingImageUrl
#showStartTime


constructor(id, title, genres, length, theatre, auditorium, presentationMethod, spokenLanguage, subtitleLanguage, ratingImageUrl, showStartTime) {
    this.#id = id;
    this.#title = title;
    this.#genres = genres;
    this.#length = length;
    this.#theatre = theatre;
    this.#auditorium = auditorium;
    this.#presentationMethod = presentationMethod;
    this.#spokenLanguage = spokenLanguage;
    this.#subtitleLanguage = subtitleLanguage;
    this.#ratingImageUrl = ratingImageUrl;
    this.#showStartTime = showStartTime;
}
getId() {
    return this.#id;
}

getTitle() {
    return this.#title;
}

getGenres() {
    return this.#genres;
}

getLength() {
    return this.#length;
}

getTheatre() {
    return this.#theatre;
}

getAuditorium() {
    return this.#auditorium;
}

getPresentationMethod() {
    return this.#presentationMethod;
}

getSpokenLanguage() {
    return this.#spokenLanguage;
}

getSubtitleLanguage() {
    return this.#subtitleLanguage;
}

getRatingImageUrl() {
    return this.#ratingImageUrl;
}

getShowStartTime() {
    return this.#showStartTime;
}
}

export {Movie}


//if arrays include?
/*General Event Information:
*Title: Mother, Couch - äiti sohvalla
Original Title: Mother, Couch
Event Type: Movie
Production Year: 2024
*Genres: Comedy, Drama
Rating: 12 (For audiences aged 12 and older)
*Event ID: 304708
*Length: 96 minutes

Local Release Date: October 11, 2024
*Rating Label: 12

*Rating Image:
Show Timing and Theatre Information:
Show Start Time (Local): November 8, 2024, 10:30 AM
Show End Time (Local): November 8, 2024, 12:16 PM
Sales Start Time: January 1, 2000 (seems like a default, no actual start time)
Sales End Time: November 8, 2024, 10:15 AM
Reservation End Time: November 7, 2024, 8:30 AM
Theatre: Tennispalatsi, Helsinki
Auditorium: Sali 4
*Presentation Method: 2D

Spoken Language: English (EN)
Subtitle Language: Finnish (FI)

URLs:
Show URL: View Show Details
Event URL: View Event Details

Images:
*Event Image:

Content Descriptors (Warnings):
*Violence:
*Disturbing:*/ 
