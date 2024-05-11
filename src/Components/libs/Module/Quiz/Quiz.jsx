import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { storeLeaderBoard } from "../../../api/store";
import AuthContext from "../../../Firebase/AuthContext";
import Loading from "../../Loading/Loading";
import { axiosInstance } from "../../../api/axiosInstance";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const module = location?.state?.quiz;
  const courseId = location.state?.courseId;
  const { user } = useContext(AuthContext);
  const { isLoading: leaderBoardLoading, addPointsAndAnalytics } =
    storeLeaderBoard();
  const auth = JSON.parse(
    localStorage.getItem(
      "firebase:authUser:AIzaSyBT-xNWHwxElgmjm4HPKvKaLlPFhBr3iak:[DEFAULT]"
    )
  );

  const quizArray = module?.quiz;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const [quizData, setQuizData] = useState({});
  console.log("🚀 ~ file: Quiz.jsx:32 ~ Quiz ~ quizData:", quizData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          `/findAnalytics/${user?.uid || auth?.uid}/module/${module?._id}`
        );
        setQuizData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (Object.keys(quizData).length === 0) {
      fetchData();
    }
  }, [module]);
  useEffect(() => {
    const calculateTotalMarks = async () => {
      if (quizAnswer.length === quizArray.length) {
        try {
          setIsLoading(true);
          let calculateTotalMarks = 0;

          await Promise.all(
            quizAnswer.map(async (userAnswer) => {
              const quizQuestion = quizArray.find(
                (question) => question._id === userAnswer.id
              );

              if (quizQuestion) {
                const isAnswerCorrect = quizQuestion.correctOptions.every(
                  (correctOption) => userAnswer.answer.includes(correctOption)
                );

                if (isAnswerCorrect) {
                  calculateTotalMarks++;
                }
              }
            })
          );
          const bodyForAnalytics = {
            modules: [
              {
                _id: module?._id,
                totalPoints: calculateTotalMarks,
                totalQuiz: quizArray?.length,
              },
            ],
            user: user?.uid,
          };

          const bodyForPoints = {
            studentId: user?.uid,
            courseId: courseId,
            point: calculateTotalMarks,
          };
          if (quizAnswer.length > 1) {
            await addPointsAndAnalytics(bodyForPoints, bodyForAnalytics);
          }
          setTotalMarks(calculateTotalMarks);
          setShowResult(true);
          setIsLoading(false);

          await confetti({
            particleCount: 1000,
            startVelocity: 100,
            spread: 360,
            origin: {
              x: Math.random(),
              y: Math.random(),
            },
          });
        } catch (error) {
          console.error("Error calculating total marks:", error);
        }
      }
    };

    calculateTotalMarks();
  }, [quizAnswer, quizArray]);

  const handleOptionSelect = (index) => {
    if (selectedOptions.includes(index)) {
      return setSelectedOptions(selectedOptions.filter((i) => i !== index));
    } else {
      return setSelectedOptions([...selectedOptions, index]);
    }
  };

  const handleNextClick = async (id) => {
    const updatedQuizAnswer = [...quizAnswer];
    const answerIndex = updatedQuizAnswer.findIndex(
      (answer) => answer.id === id
    );

    if (answerIndex !== -1) {
      updatedQuizAnswer[answerIndex] = { id: id, answer: selectedOptions };
    } else {
      updatedQuizAnswer.push({ id: id, answer: selectedOptions });
    }

    if (currentQuestionIndex < quizArray.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLoading(true);
      setTimeout(async () => {
        await addAnalyticsInDataBase();
      }, 1000);
    }

    setQuizAnswer(updatedQuizAnswer);
    const findOptions = quizAnswer.find(
      (i) => i.id === quizArray[currentQuestionIndex + 1]?._id
    );
    if (findOptions && currentQuestionIndex !== quizArray?.length) {
      setSelectedOptions(findOptions.answer);
    } else {
      setSelectedOptions([]);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      const findOptions = quizAnswer.find(
        (i) => i.id === quizArray[currentQuestionIndex - 1]._id
      );

      setSelectedOptions(findOptions?.answer);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (isLoading || leaderBoardLoading) {
    return <Loading />;
  }
  return (
    <>
      {Object.keys(quizData).length === 3 ? (
        <section className="flex justify-center items-center  ">
          <div className="w-80 flex flex-col items-center gap-4  border border-gray-600 p-10 rounded-xl">
            <p className="text-center text-lg font-inter font-semibold">
              Your Quiz Numbers is{" "}
              <span className="text-secondary">{quizData?.totalPoints}</span>/
              <span className="text-primary">{quizData?.totalQuiz}</span>
            </p>
            <button
              className="btn btn-accent w-24 capitalize"
              onClick={() => navigate(-1)}
            >
              go back
            </button>
          </div>
        </section>
      ) : (
        <section className="flex flex-wrap gap-9 justify-center items-center">
          <div className="lg:w-1/2 flex justify-center">
            <AnimatePresence mode="wait">
              {!showResult && !isLoading ? (
                <div className="w-4/5 flex flex-col items-center gap-3 border p-3 border-gray-500 rounded-2xl">
                  <motion.p
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="lg:w-2/4 text-center capitalize text-xl font-semibold"
                  >
                    {quizArray[currentQuestionIndex].question}
                  </motion.p>
                  {quizArray[currentQuestionIndex]?.options?.map(
                    (option, index) => (
                      <motion.label
                        key={`q${currentQuestionIndex}-o${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="lg:w-2/4 border flex rounded-lg p-3 items-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(index)}
                          className="checkbox mr-2"
                          onChange={() => handleOptionSelect(index)}
                        />
                        <p className="text-center flex-grow overflow-ellipsis">
                          {option.option}
                        </p>
                      </motion.label>
                    )
                  )}

                  <div className="flex gap-3">
                    <button
                      className="btn"
                      onClick={handlePreviousClick}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleNextClick(quizArray[currentQuestionIndex]._id)
                      }
                    >
                      {currentQuestionIndex === quizArray.length - 1
                        ? "Submit"
                        : "Next"}
                    </button>
                  </div>
                </div>
              ) : (
                <section className="flex flex-col gap-3 items-center justify-center">
                  <p className="text-xl font-semibold">
                    Total numbers :{totalMarks}/{quizArray?.length}{" "}
                  </p>
                  {quizArray.map((ques) => (
                    <div className="w-4/5 flex flex-col  items-center gap-3 border p-3 border-gray-500 rounded-2xl">
                      <motion.p
                        key={ques?._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="w-2/4 text-center capitalize text-xl font-semibold"
                      >
                        {ques?.question}
                      </motion.p>
                      {ques?.options?.map((option, index) => {
                        const isSelected = quizAnswer
                          .find((answer) => answer.id === ques?._id)
                          ?.answer.includes(index);
                        const isCorrect = ques?.correctOptions?.includes(index);
                        let backgroundColor = "bg-slate-100";
                        if (isSelected) {
                          backgroundColor = isCorrect
                            ? "bg-green-500"
                            : "bg-red-500";
                        } else if (isCorrect) {
                          backgroundColor = "bg-green-500";
                        }
                        return (
                          <motion.label
                            key={`q${ques}-o${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className={`w-2/4 border flex rounded-lg p-3 items-center cursor-pointer ${backgroundColor}`}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected ? true : false}
                              className="checkbox mr-2"
                            />
                            <p className="text-center flex-grow overflow-ellipsis">
                              {option.option}
                            </p>
                          </motion.label>
                        );
                      })}
                    </div>
                  ))}
                </section>
              )}
            </AnimatePresence>
          </div>
          <div className="w-96 flex flex-col  items-center gap-3 ">
            {quizArray?.map((quizI, index) => (
              <div
                key={index}
                className={`w-4/5 ${
                  index === currentQuestionIndex
                    ? "bg-slate-50 neon-gray"
                    : "bg-slate-400"
                }  p-2 rounded-xl animation `}
              >
                <p className="text-center capitalize text-xl font-semibold ">
                  {quizI?.question}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Quiz;
