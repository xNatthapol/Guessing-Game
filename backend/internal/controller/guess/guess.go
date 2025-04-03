package guess

import (
	"github.com/gin-gonic/gin"
	"math/rand"
	"net/http"
)

var hiddenNumber int

type GuessNumberRequest struct {
	Guess int `json:"guess"`
}

func generateNewNumber() int {
	return rand.Intn(10) + 1
}

func init() {
	hiddenNumber = generateNewNumber()
}

func GuessNumber(c *gin.Context) {
	var request GuessNumberRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	if request.Guess == hiddenNumber {
		hiddenNumber = generateNewNumber()
		c.JSON(http.StatusCreated, gin.H{"status": "ok", "message": "Correct! Number regenerated."})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Wrong guess, try again!"})
	}
}

func AnswerNumber(c *gin.Context) {
	hiddenNumber = generateNewNumber()
	c.JSON(http.StatusOK, gin.H{"status": "ok", "answer": hiddenNumber, "message": "New number generated!"})
}
