import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { isToday, isThisWeek, isThisMonth, parseISO, set } from "date-fns";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completeTasksCount, setCompleteTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompleteTasksCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất fetchTasks", error);
      toast.error("Lỗi xảy ra khi truy xuất dữ liệu.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // // Tu them vao de check ngay bang date-fns
  // const filteredTasksOfTimes = useMemo(() => {
  //   return taskBuffer.filter((task) => {
  //     const date = parseISO(task.createdAt);
  //     switch (dateQuery) {
  //       case "today":
  //         return isToday(date);
  //       case "week":
  //         return isThisWeek(date, { weekStartsOn: 1 }); // bắt đầu từ thứ 2
  //       case "month":
  //         return isThisMonth(date);
  //       default:
  //         return true; // all
  //     }
  //   });
  // }, [dateQuery, taskBuffer]);

  // const filteredTasks = (filterOfTimes === "all" ? taskBuffer : filteredTasksOfTimes).filter((task) => {
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
        break;
      case "complete":
        return task.status === "complete";
        break;
      default:
        return true;
        break;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handlePageChange = (newpage) => {
    setPage(newpage);
  };
  if (visibleTasks.length === 0) {
    handlePrev();
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen w-full bg-[#fefcff] relative">
        {/* Dreamy Sky Pink Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
          }}
        />

        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl mx-auto space-y-6 p-6">
            {/* Đầu trang */}
            <Header />
            {/* Tạo nhiệm vụ */}
            <AddTask handleNewTaskAdded={fetchTasks} />
            {/* Thống kê và bộ lọc */}
            <StatsAndFilters
              activeTasksCount={activeTasksCount}
              comleteTasksCount={completeTasksCount}
              filter={filter}
              setFilter={setFilter}
            />
            {/* Danh sách nhiệm vụ */}
            <TaskList
              filteredTasks={visibleTasks}
              filter={filter}
              handleTaskChanged={fetchTasks}
            />
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              {/* Phần trang */}
              <TaskListPagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
                page={page}
              />
              {/* Lọc trang theo Date */}
              <DateTimeFilter
                dateQuery={dateQuery}
                setDateQuery={setDateQuery}
              />
            </div>
            {/* Chân trang */}
            <Footer
              completedTasksCount={completeTasksCount}
              activeTasksCount={activeTasksCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
