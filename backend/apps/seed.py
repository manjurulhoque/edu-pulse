from datetime import datetime
from sqlalchemy.orm import Session
from apps.users.models import User
from apps.categories.models import Category
from apps.courses.models import Course, CourseSection
from apps.lessons.models import Lesson
from apps.enrollments.models import Enrollment
from conf.database import SessionLocal
from apps.users.helpers import get_password_hash


def create_sample_data(db: Session):
    # Create Users first and get their IDs
    users = [
        User(
            email="rumi@gmail.com",
            username="rumi",
            password=get_password_hash("123456"),
            name="John Doe",
            is_admin=True,
            avatar="media/images/avatar.webp",
        ),
        User(
            email="jane@gmail.com",
            username="jane",
            password=get_password_hash("123456"),
            name="Jane Smith",
            is_admin=False,
            avatar="media/images/avatar.webp",
        ),
        User(
            email="john@gmail.com",
            username="john",
            password=get_password_hash("123456"),
            name="Manjurul Hoque Rumi",
            is_admin=True,
            avatar="media/images/avatar.webp",
        )
    ]
    # Add users individually
    for user in users:
        db.add(user)
    db.commit()
    
    # Refresh to get the IDs
    for user in users:
        db.refresh(user)

    # Create Categories
    categories = [
        Category(name="Web Development", description="Learn web development technologies"),
        Category(name="Data Science", description="Master data science and analytics"),
        Category(name="Mobile Development", description="Build mobile applications"),
        Category(name="Graphic Design", description="Create stunning visuals"),
        Category(name="Digital Marketing", description="Learn marketing strategies"),
        Category(name="Cybersecurity", description="Protect systems and networks"),
        Category(name="Machine Learning", description="Explore AI and ML techniques"),
        Category(name="Game Development", description="Create your own games"),
        Category(name="Cloud Computing", description="Understand cloud technologies"),
        Category(name="Blockchain", description="Learn about decentralized systems"),
    ]
    for category in categories:
        db.add(category)
    db.commit()
    
    # Refresh to get category IDs
    for category in categories:
        db.refresh(category)

    # Create Courses
    courses = [
        Course(
            title="Complete Web Development Bootcamp",
            slug="complete-web-dev-bootcamp",
            short_description="Learn web development from scratch and build real-world projects.",
            description="This comprehensive course covers everything you need to know about web development. You will start with the basics of HTML and CSS, learning how to create beautiful and responsive web pages. As you progress, you will dive into JavaScript, mastering the fundamentals of programming and how to make your websites interactive. The course also includes sections on popular frameworks and libraries, such as React, to help you build modern web applications. By the end of this course, you will have the skills to create your own projects and a portfolio to showcase your work. Join us and start your journey in web development today!",
            student_will_learn="Build responsive websites\nMaster JavaScript\nCreate dynamic web applications\nUnderstand web development frameworks",
            requirements="Basic computer knowledge and a strong dedication to learn web development concepts and practices. Familiarity with using a computer and navigating the internet is essential.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[0].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Python for Data Science",
            slug="python-data-science",
            short_description="Master Python for data analysis and visualization with hands-on projects.",
            description="In this course, you will learn how to use Python for data analysis and visualization. We will cover essential libraries such as Pandas and NumPy, which are crucial for data manipulation. You will also learn how to create stunning visualizations using Matplotlib and Seaborn. The course includes real-world projects that will help you apply your skills in practical scenarios. By the end of this course, you will be able to analyze datasets, draw insights, and present your findings effectively. This is a must-take course for anyone looking to enter the field of data science.",
            student_will_learn="Data analysis with Pandas\nVisualization with Matplotlib\nPerform statistical analysis\nCreate insightful data visualizations",
            requirements="Basic Python knowledge is required, along with a willingness to engage with data and learn analytical techniques. Familiarity with programming concepts will be beneficial.",
            level="Intermediate",
            preview_image="media/images/preview1.webp",
            actual_price=149.99,
            discounted_price=89.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[1].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Introduction to Graphic Design",
            slug="intro-graphic-design",
            short_description="Learn the basics of graphic design and create stunning visuals.",
            description="This course is designed for beginners who want to explore the world of graphic design. You will learn about design principles, color theory, typography, and composition. The course will guide you through the use of popular design software, allowing you to create your own graphics and layouts. By the end of the course, you will have a solid understanding of graphic design concepts and the ability to create visually appealing designs. Whether you want to pursue a career in design or just want to enhance your skills, this course is perfect for you.",
            student_will_learn="Create stunning visuals\nUnderstand design software\nApply design principles\nDevelop a personal design style",
            requirements="No prior experience required, but a passion for creativity and an interest in visual communication will greatly enhance your learning experience.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=79.99,
            discounted_price=39.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[3].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Digital Marketing Masterclass",
            slug="digital-marketing-master",
            short_description="Become a digital marketing expert with practical skills.",
            description="This masterclass will take you through the essential strategies and tools used in digital marketing. You will learn about SEO, PPC, social media marketing, and content marketing. The course includes hands-on projects that will help you create effective marketing campaigns. You will also learn how to analyze data to measure the success of your campaigns and make data-driven decisions. By the end of this course, you will have the skills to launch and manage successful digital marketing campaigns. This is an invaluable course for anyone looking to excel in the digital marketing field.",
            student_will_learn="Create effective marketing campaigns\nAnalyze data\nUnderstand SEO and PPC strategies\nUtilize social media for marketing",
            requirements="Basic understanding of marketing is necessary, along with a desire to learn about digital tools and strategies that can enhance your marketing efforts.",
            level="Intermediate",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[4].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Cybersecurity Fundamentals",
            slug="cybersecurity-fundamentals",
            short_description="Learn the basics of cybersecurity and protect systems.",
            description="In this course, you will gain a foundational understanding of cybersecurity principles and practices. We will cover various types of cyber threats, including malware, phishing, and social engineering. You will learn how to protect systems and networks from these threats. The course will also introduce you to security measures and best practices for safeguarding sensitive information. By the end of this course, you will be equipped with the knowledge to identify security risks and implement effective security strategies. This course is essential for anyone interested in pursuing a career in cybersecurity.",
            student_will_learn="Identify security risks\nImplement security measures\nUnderstand common cyber threats\nDevelop a security mindset",
            requirements="Interest in technology is important, along with a willingness to learn about the various aspects of cybersecurity and how to protect digital assets.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=89.99,
            discounted_price=44.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[5].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Machine Learning A-Z",
            slug="ml-a-z",
            short_description="Master machine learning algorithms and techniques.",
            description="This comprehensive course will take you through the fundamentals of machine learning. You will learn about various algorithms, including supervised and unsupervised learning. The course includes hands-on projects that will allow you to apply your knowledge to real-world problems. You will also learn how to evaluate and improve your models. By the end of this course, you will have a solid understanding of machine learning concepts and the ability to build your own machine learning models. This course is perfect for anyone looking to enter the field of data science and machine learning.",
            student_will_learn="Build ML models\nUnderstand algorithms\nEvaluate model performance\nApply machine learning techniques to real-world problems",
            requirements="Basic Python knowledge is required, along with a curiosity to explore data-driven solutions and a commitment to learning about machine learning techniques.",
            level="Intermediate",
            preview_image="media/images/preview1.webp",
            actual_price=149.99,
            discounted_price=99.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[6].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Game Development with Unity",
            slug="game-dev-unity",
            short_description="Create games using Unity and learn game design principles.",
            description="In this course, you will learn how to develop games using the Unity game engine. We will cover the basics of game design, including character creation, level design, and game mechanics. You will also learn how to use Unity's powerful tools to bring your game ideas to life. The course includes hands-on projects that will help you build your own games from scratch. By the end of this course, you will have the skills to create engaging and interactive games. This course is ideal for anyone interested in game development.",
            student_will_learn="Build 2D and 3D games\nUnderstand game mechanics\nDesign engaging gameplay\nUtilize Unity tools effectively",
            requirements="Basic programming knowledge is necessary, along with a passion for gaming and a desire to learn about game development processes and tools.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[7].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Cloud Computing Basics",
            slug="cloud-computing-basics",
            short_description="Understand cloud computing concepts and services.",
            description="This course will introduce you to the fundamentals of cloud computing. You will learn about different cloud service models, including IaaS, PaaS, and SaaS. The course will also cover cloud deployment models, such as public, private, and hybrid clouds. You will gain hands-on experience with popular cloud platforms and learn how to deploy applications in the cloud. By the end of this course, you will have a solid understanding of cloud computing concepts and the ability to leverage cloud technologies for your projects. This course is essential for anyone looking to work in IT or software development.",
            student_will_learn="Use cloud platforms\nImplement cloud solutions\nUnderstand cloud service models\nDeploy applications in the cloud",
            requirements="Interest in IT is important, along with a willingness to learn about cloud technologies and how they can be applied in various business scenarios.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=79.99,
            discounted_price=39.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[8].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Blockchain Basics",
            slug="blockchain-basics",
            short_description="Learn about blockchain technology and its applications.",
            description="In this course, you will explore the fundamentals of blockchain technology. You will learn how blockchain works, its applications, and its potential impact on various industries. The course will cover key concepts such as decentralization, consensus mechanisms, and smart contracts. You will also gain hands-on experience with blockchain development tools. By the end of this course, you will have a solid understanding of blockchain technology and its implications for the future. This course is perfect for anyone interested in emerging technologies.",
            student_will_learn="Create smart contracts\nExplore cryptocurrencies\nUnderstand blockchain applications\nDevelop blockchain-based solutions",
            requirements="Interest in technology is essential, along with a desire to understand how blockchain can transform industries and create new opportunities.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=89.99,
            discounted_price=44.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[9].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        # Additional courses
        Course(
            title="Advanced JavaScript",
            slug="advanced-js",
            short_description="Deep dive into JavaScript and modern frameworks.",
            description="This course is designed for those who want to take their JavaScript skills to the next level. You will learn about advanced concepts such as closures, promises, and async/await. The course will also cover popular frameworks and libraries, including React and Node.js. You will gain hands-on experience through projects that will challenge your understanding and push your skills further. By the end of this course, you will be proficient in advanced JavaScript techniques and ready to tackle complex programming tasks. This course is ideal for developers looking to enhance their JavaScript knowledge.",
            student_will_learn="Master ES6 features\nUnderstand asynchronous programming\nWork with modern frameworks\nBuild complex applications",
            requirements="Basic JavaScript knowledge is required, along with a strong desire to learn about modern development practices and frameworks that enhance web applications.",
            level="Intermediate",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[0].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="React - The Complete Guide",
            slug="react-complete-guide",
            short_description="Learn React from scratch and build dynamic web applications.",
            description="This comprehensive guide will teach you everything you need to know about React. You will start with the basics of components, props, and state management. As you progress, you will learn about advanced topics such as hooks, context API, and routing. The course includes hands-on projects that will help you build real-world applications using React. By the end of this course, you will have a solid understanding of React and the ability to create dynamic web applications. This course is perfect for anyone looking to become a proficient React developer.",
            student_will_learn="Create dynamic web apps\nUnderstand React hooks\nManage application state\nBuild reusable components",
            requirements="Basic JavaScript knowledge is necessary, along with a passion for building user interfaces and a willingness to learn about component-based architecture.",
            level="Intermediate",
            preview_image="media/images/preview1.webp",
            actual_price=129.99,
            discounted_price=79.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[0].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Django for Beginners",
            slug="django-beginners",
            short_description="Build web applications with Django and learn MVC architecture.",
            description="This course is designed for beginners who want to learn web development using Django. You will start with the basics of Django, including models, views, and templates. The course will guide you through building your first web application step by step. You will also learn about Django's powerful features, such as authentication and database management. By the end of this course, you will have the skills to create your own web applications using Django. This course is ideal for anyone looking to start a career in web development.",
            student_will_learn="Create web apps\nUnderstand MVC architecture\nImplement user authentication\nManage databases with Django",
            requirements="Basic Python knowledge is required, along with a desire to learn about web frameworks and how to build scalable applications.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[0].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Introduction to SQL",
            slug="intro-sql",
            short_description="Learn SQL for database management and data manipulation.",
            description="In this course, you will learn the fundamentals of SQL, the standard language for managing and manipulating databases. You will start with basic queries and gradually move on to more complex operations such as joins, subqueries, and transactions. The course will also cover database design principles and best practices. By the end of this course, you will be able to write SQL queries to retrieve and manipulate data effectively. This course is essential for anyone looking to work with databases in their career.",
            student_will_learn="Write SQL queries\nManage databases\nPerform data manipulation\nUnderstand database design principles",
            requirements="No prior experience required, but a willingness to learn about data management and an interest in working with databases will be beneficial.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=79.99,
            discounted_price=39.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[1].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Data Visualization with Python",
            slug="data-viz-python",
            short_description="Create visualizations using Python and communicate insights effectively.",
            description="This course will teach you how to create stunning visualizations using Python libraries such as Matplotlib and Seaborn. You will learn how to represent data visually to uncover insights and communicate findings effectively. The course includes hands-on projects that will help you apply your skills in real-world scenarios. By the end of this course, you will be proficient in data visualization techniques and able to create informative and engaging visualizations. This course is perfect for anyone looking to enhance their data analysis skills.",
            student_will_learn="Create charts and graphs\nAnalyze data visually\nCommunicate insights effectively\nUtilize visualization libraries",
            requirements="Basic Python knowledge is required, along with a desire to learn about data representation and how to effectively communicate findings through visual means.",
            level="Intermediate",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[1].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Mobile App Development with Flutter",
            slug="mobile-app-dev-flutter",
            short_description="Build mobile apps using Flutter and learn cross-platform development.",
            description="In this course, you will learn how to develop mobile applications using Flutter, a popular framework for building cross-platform apps. You will start with the basics of Flutter, including widgets, layouts, and navigation. The course will guide you through building your first mobile app step by step. You will also learn about state management and how to connect your app to backend services. By the end of this course, you will have the skills to create your own mobile applications using Flutter. This course is ideal for anyone interested in mobile app development.",
            student_will_learn="Develop apps for iOS and Android\nUnderstand Flutter framework\nImplement state management\nConnect apps to backend services",
            requirements="Basic programming knowledge is necessary, along with a passion for mobile development and a desire to learn about cross-platform application design.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[2].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="iOS App Development with Swift",
            slug="ios-app-dev-swift",
            short_description="Learn to build iOS applications using Swift and Xcode.",
            description="This course will teach you how to develop iOS applications using Swift, Apple's programming language. You will start with the basics of Swift, including syntax, data types, and control flow. The course will guide you through building your first iOS app step by step. You will also learn about iOS app architecture and how to use Xcode for development. By the end of this course, you will have the skills to create your own iOS applications. This course is perfect for anyone looking to enter the field of iOS development.",
            student_will_learn="Create iOS apps\nUnderstand app lifecycle\nUtilize Xcode for development\nImplement Swift programming concepts",
            requirements="Basic programming knowledge is necessary, along with a desire to learn about iOS development and an interest in creating applications for Apple devices.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[2].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Android App Development with Kotlin",
            slug="android-app-dev-kotlin",
            short_description="Build Android applications using Kotlin and Android Studio.",
            description="In this course, you will learn how to develop Android applications using Kotlin, a modern programming language. You will start with the basics of Kotlin, including syntax, data types, and object-oriented programming. The course will guide you through building your first Android app step by step. You will also learn about Android app architecture and how to use Android Studio for development. By the end of this course, you will have the skills to create your own Android applications. This course is ideal for anyone interested in Android app development.",
            student_will_learn="Create Android apps\nUnderstand app components\nUtilize Android Studio\nImplement Kotlin programming concepts",
            requirements="Basic programming knowledge is necessary, along with a passion for mobile technology and a desire to learn about Android development practices.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[2].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Introduction to UX/UI Design",
            slug="intro-ux-ui-design",
            short_description="Learn the principles of UX/UI design and create user-centered designs.",
            description="This course is designed for beginners who want to understand the principles of user experience (UX) and user interface (UI) design. You will learn about design thinking, user research, and prototyping. The course will guide you through the process of creating user-centered designs that are both functional and aesthetically pleasing. By the end of this course, you will have the skills to create effective UX/UI designs for web and mobile applications. This course is perfect for anyone looking to enter the field of design.",
            student_will_learn="Create user-friendly designs\nUnderstand design tools\nConduct user research\nDevelop prototypes",
            requirements="No prior experience required, but a passion for design and an interest in creating user-centered experiences will enhance your learning.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=79.99,
            discounted_price=39.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[3].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Advanced Digital Marketing Strategies",
            slug="adv-digital-marketing",
            short_description="Master advanced marketing techniques and optimize campaigns.",
            description="In this course, you will learn advanced digital marketing strategies that can help you stand out in a competitive market. You will explore topics such as content marketing, email marketing, and social media advertising. The course includes hands-on projects that will help you create effective marketing campaigns. You will also learn how to analyze data to measure the success of your campaigns and optimize your strategies. By the end of this course, you will have the skills to implement advanced digital marketing techniques. This course is essential for anyone looking to excel in the digital marketing field.",
            student_will_learn="Create data-driven marketing strategies\nOptimize campaigns\nUtilize advanced marketing tools\nAnalyze marketing data",
            requirements="Basic understanding of digital marketing is necessary, along with a desire to learn about advanced techniques and tools that can enhance your marketing efforts.",
            level="Intermediate",
            preview_image="media/images/preview1.webp",
            actual_price=99.99,
            discounted_price=49.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[4].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Ethical Hacking for Beginners",
            slug="ethical-hacking-beginners",
            short_description="Learn the basics of ethical hacking and protect systems.",
            description="This course will introduce you to the fundamentals of ethical hacking and penetration testing. You will learn about various hacking techniques and how to protect systems from cyber threats. The course will cover topics such as network security, web application security, and vulnerability assessment. By the end of this course, you will have the skills to identify security vulnerabilities and implement effective security measures. This course is essential for anyone interested in pursuing a career in cybersecurity.",
            student_will_learn="Identify vulnerabilities\nImplement security measures\nUnderstand ethical hacking techniques\nConduct penetration testing",
            requirements="Interest in cybersecurity is essential, along with a willingness to learn about security practices and how to protect systems from threats.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=89.99,
            discounted_price=44.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[5].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Deep Learning with TensorFlow",
            slug="deep-learning-tf",
            short_description="Master deep learning techniques and build neural networks.",
            description="In this course, you will learn how to build deep learning models using TensorFlow, one of the most popular frameworks for machine learning. You will start with the basics of neural networks and gradually move on to more complex architectures such as convolutional and recurrent neural networks. The course includes hands-on projects that will help you apply your knowledge to real-world problems. By the end of this course, you will have the skills to create and train your own deep learning models. This course is perfect for anyone looking to specialize in machine learning.",
            student_will_learn="Create deep learning models\nUnderstand neural networks\nImplement advanced algorithms\nApply deep learning techniques to real-world problems",
            requirements="Basic Python knowledge is required, along with a strong interest in machine learning and a desire to learn about advanced algorithms and their applications.",
            level="Intermediate",
            preview_image="media/images/preview1.webp",
            actual_price=149.99,
            discounted_price=99.99,
            is_free=False,
            is_published=True,
            user_id=users[1].id,  # Use actual user ID
            category_id=categories[6].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
        Course(
            title="Game Design Fundamentals",
            slug="game-design-fundamentals",
            short_description="Learn the principles of game design and create engaging experiences.",
            description="This course will introduce you to the fundamentals of game design. You will learn about game mechanics, storytelling, and player engagement. The course will cover various aspects of game development, including character design, level design, and user experience. You will also gain hands-on experience through projects that will help you create your own games. By the end of this course, you will have a solid understanding of game design principles and the ability to create engaging game experiences. This course is ideal for anyone interested in pursuing a career in game development.",
            student_will_learn="Create engaging game experiences\nUnderstand player psychology\nDesign compelling narratives\nDevelop interactive gameplay",
            requirements="Interest in game development is essential, along with a desire to learn about the creative processes involved in designing games and engaging players.",
            level="Beginner",
            preview_image="media/images/preview1.webp",
            actual_price=79.99,
            discounted_price=39.99,
            is_free=False,
            is_published=True,
            user_id=users[0].id,  # Use actual user ID
            category_id=categories[7].id,  # Use actual category ID
            created_at=datetime.now(),
            updated_at=datetime.now(),
        ),
    ]
    for course in courses:
        db.add(course)
    db.commit()
    
    # Refresh to get course IDs
    for course in courses:
        db.refresh(course)

    # Create Sections
    sections = [
        CourseSection(title="HTML Fundamentals", course_id=courses[0].id),
        CourseSection(title="CSS Basics", course_id=courses[0].id),
        CourseSection(title="JavaScript Basics", course_id=courses[0].id),
        CourseSection(title="React Basics", course_id=courses[1].id),
        CourseSection(title="Data Analysis with Pandas", course_id=courses[1].id),
        CourseSection(title="Data Visualization with Matplotlib", course_id=courses[1].id),
        CourseSection(title="Design Principles", course_id=courses[2].id),
        CourseSection(title="Tools for Graphic Design", course_id=courses[2].id),
        CourseSection(title="SEO Basics", course_id=courses[3].id),
        CourseSection(title="PPC Advertising", course_id=courses[3].id),
        CourseSection(title="Cybersecurity Basics", course_id=courses[4].id),
        CourseSection(title="Threat Analysis", course_id=courses[4].id),
        CourseSection(title="Machine Learning Basics", course_id=courses[5].id),
        CourseSection(title="Deep Learning Techniques", course_id=courses[5].id),
        CourseSection(title="Game Development Basics", course_id=courses[6].id),
        CourseSection(title="Unity Fundamentals", course_id=courses[6].id),
        CourseSection(title="Cloud Concepts", course_id=courses[7].id),
        CourseSection(title="AWS Basics", course_id=courses[7].id),
        CourseSection(title="Blockchain Fundamentals", course_id=courses[8].id),
        CourseSection(title="Smart Contracts", course_id=courses[8].id),
        CourseSection(title="JavaScript Advanced Concepts", course_id=courses[9].id),
        CourseSection(title="React Hooks", course_id=courses[9].id),
        CourseSection(title="Django Basics", course_id=courses[10].id),
        CourseSection(title="Django Models", course_id=courses[10].id),
        CourseSection(title="SQL Basics", course_id=courses[11].id),
        CourseSection(title="SQL Queries", course_id=courses[11].id),
        CourseSection(title="Data Visualization Basics", course_id=courses[12].id),
        CourseSection(title="Advanced Visualization Techniques", course_id=courses[12].id),
        CourseSection(title="Flutter Basics", course_id=courses[13].id),
        CourseSection(title="Building Apps with Flutter", course_id=courses[13].id),
        CourseSection(title="iOS Development Basics", course_id=courses[14].id),
        CourseSection(title="Swift Programming", course_id=courses[14].id),
        CourseSection(title="Android Development Basics", course_id=courses[15].id),
        CourseSection(title="Kotlin Programming", course_id=courses[15].id),
        CourseSection(title="UX Principles", course_id=courses[16].id),
        CourseSection(title="UI Design Tools", course_id=courses[16].id),
        CourseSection(title="Advanced Marketing Techniques", course_id=courses[17].id),
        CourseSection(title="Analytics for Marketing", course_id=courses[17].id),
        CourseSection(title="Ethical Hacking Basics", course_id=courses[18].id),
        CourseSection(title="Penetration Testing", course_id=courses[18].id),
        CourseSection(title="Deep Learning Basics", course_id=courses[19].id),
        CourseSection(title="Building Neural Networks", course_id=courses[19].id),
        CourseSection(title="Game Mechanics", course_id=courses[20].id),
        CourseSection(title="Storytelling in Games", course_id=courses[20].id),
    ]
    for section in sections:
        db.add(section)
    db.commit()
    
    # Refresh to get section IDs
    for section in sections:
        db.refresh(section)

    # Create Lessons
    lessons = [
        Lesson(
            title="Introduction to HTML",
            content="https://youtube.com/watch?v=html-intro",
            course_id=courses[0].id,
            section_id=sections[0].id,
        ),
        Lesson(
            title="HTML Forms",
            content="https://youtube.com/watch?v=html-forms",
            course_id=courses[0].id,
            section_id=sections[0].id,
        ),
        Lesson(
            title="CSS Selectors",
            content="https://youtube.com/watch?v=css-selectors",
            course_id=courses[0].id,
            section_id=sections[1].id,
        ),
        Lesson(
            title="JavaScript Basics",
            content="https://youtube.com/watch?v=js-basics",
            course_id=courses[0].id,
            section_id=sections[2].id,
        ),
        Lesson(
            title="React Introduction",
            content="https://youtube.com/watch?v=react-intro",
            course_id=courses[1].id,
            section_id=sections[3].id,
        ),
        Lesson(
            title="Data Analysis with Pandas",
            content="https://youtube.com/watch?v=pandas-analysis",
            course_id=courses[1].id,
            section_id=sections[4].id,
        ),
        Lesson(
            title="Data Visualization with Matplotlib",
            content="https://youtube.com/watch?v=matplotlib-viz",
            course_id=courses[1].id,
            section_id=sections[5].id,
        ),
        Lesson(
            title="Design Principles Overview",
            content="https://youtube.com/watch?v=design-principles",
            course_id=courses[2].id,
            section_id=sections[6].id,
        ),
        Lesson(
            title="Using Design Tools",
            content="https://youtube.com/watch?v=design-tools",
            course_id=courses[2].id,
            section_id=sections[7].id,
        ),
        Lesson(
            title="SEO Basics",
            content="https://youtube.com/watch?v=seo-basics",
            course_id=courses[3].id,
            section_id=sections[8].id,
        ),
        Lesson(
            title="PPC Advertising Strategies",
            content="https://youtube.com/watch?v=ppc-strategies",
            course_id=courses[3].id,
            section_id=sections[9].id,
        ),
        Lesson(
            title="Cybersecurity Overview",
            content="https://youtube.com/watch?v=cybersecurity-overview",
            course_id=courses[4].id,
            section_id=sections[10].id,
        ),
        Lesson(
            title="Threat Analysis Techniques",
            content="https://youtube.com/watch?v=threat-analysis",
            course_id=courses[4].id,
            section_id=sections[11].id,
        ),
        Lesson(
            title="Machine Learning Introduction",
            content="https://youtube.com/watch?v=ml-intro",
            course_id=courses[5].id,
            section_id=sections[12].id,
        ),
        Lesson(
            title="Deep Learning Overview",
            content="https://youtube.com/watch?v=deep-learning-overview",
            course_id=courses[5].id,
            section_id=sections[13].id,
        ),
        Lesson(
            title="Game Development Basics",
            content="https://youtube.com/watch?v=game-dev-basics",
            course_id=courses[6].id,
            section_id=sections[14].id,
        ),
        Lesson(
            title="Unity Introduction",
            content="https://youtube.com/watch?v=unity-intro",
            course_id=courses[6].id,
            section_id=sections[15].id,
        ),
        Lesson(
            title="Cloud Computing Overview",
            content="https://youtube.com/watch?v=cloud-computing-overview",
            course_id=courses[7].id,
            section_id=sections[16].id,
        ),
        Lesson(
            title="AWS Basics",
            content="https://youtube.com/watch?v=aws-basics",
            course_id=courses[7].id,
            section_id=sections[17].id,
        ),
        Lesson(
            title="Blockchain Basics",
            content="https://youtube.com/watch?v=blockchain-basics",
            course_id=courses[8].id,
            section_id=sections[18].id,
        ),
        Lesson(
            title="Creating Smart Contracts",
            content="https://youtube.com/watch?v=smart-contracts",
            course_id=courses[8].id,
            section_id=sections[19].id,
        ),
        Lesson(
            title="JavaScript Advanced Concepts",
            content="https://youtube.com/watch?v=js-advanced",
            course_id=courses[9].id,
            section_id=sections[20].id,
        ),
        Lesson(
            title="React Hooks Overview",
            content="https://youtube.com/watch?v=react-hooks",
            course_id=courses[9].id,
            section_id=sections[21].id,
        ),
        Lesson(
            title="Django Basics",
            content="https://youtube.com/watch?v=django-basics",
            course_id=courses[10].id,
            section_id=sections[22].id,
        ),
        Lesson(
            title="Understanding Django Models",
            content="https://youtube.com/watch?v=django-models",
            course_id=courses[10].id,
            section_id=sections[23].id,
        ),
        Lesson(
            title="SQL Basics",
            content="https://youtube.com/watch?v=sql-basics",
            course_id=courses[11].id,
            section_id=sections[24].id,
        ),
        Lesson(
            title="Writing SQL Queries",
            content="https://youtube.com/watch?v=sql-queries",
            course_id=courses[11].id,
            section_id=sections[25].id,
        ),
        Lesson(
            title="Data Visualization Basics",
            content="https://youtube.com/watch?v=data-viz-basics",
            course_id=courses[12].id,
            section_id=sections[26].id,
        ),
        Lesson(
            title="Advanced Visualization Techniques",
            content="https://youtube.com/watch?v=advanced-viz",
            course_id=courses[12].id,
            section_id=sections[27].id,
        ),
        Lesson(
            title="Flutter Basics",
            content="https://youtube.com/watch?v=flutter-basics",
            course_id=courses[13].id,
            section_id=sections[28].id,
        ),
        Lesson(
            title="Building Apps with Flutter",
            content="https://youtube.com/watch?v=flutter-apps",
            course_id=courses[13].id,
            section_id=sections[29].id,
        ),
        Lesson(
            title="iOS Development Basics",
            content="https://youtube.com/watch?v=ios-basics",
            course_id=courses[14].id,
            section_id=sections[30].id,
        ),
        Lesson(
            title="Swift Programming Basics",
            content="https://youtube.com/watch?v=swift-basics",
            course_id=courses[14].id,
            section_id=sections[31].id,
        ),
        Lesson(
            title="Android Development Basics",
            content="https://youtube.com/watch?v=android-basics",
            course_id=courses[15].id,
            section_id=sections[32].id,
        ),
        Lesson(
            title="Kotlin Programming Basics",
            content="https://youtube.com/watch?v=kotlin-basics",
            course_id=courses[15].id,
            section_id=sections[33].id,
        ),
        Lesson(
            title="UX Principles Overview",
            content="https://youtube.com/watch?v=ux-principles",
            course_id=courses[16].id,
            section_id=sections[34].id,
        ),
        Lesson(
            title="UI Design Tools Overview",
            content="https://youtube.com/watch?v=ui-tools",
            course_id=courses[16].id,
            section_id=sections[35].id,
        ),
        Lesson(
            title="Advanced Marketing Techniques",
            content="https://youtube.com/watch?v=advanced-marketing",
            course_id=courses[17].id,
            section_id=sections[36].id,
        ),
        Lesson(
            title="Analytics for Marketing",
            content="https://youtube.com/watch?v=analytics-marketing",
            course_id=courses[17].id,
            section_id=sections[37].id,
        ),
        Lesson(
            title="Ethical Hacking Basics",
            content="https://youtube.com/watch?v=ethical-hacking-basics",
            course_id=courses[18].id,
            section_id=sections[38].id,
        ),
        Lesson(
            title="Penetration Testing Techniques",
            content="https://youtube.com/watch?v=penetration-testing",
            course_id=courses[18].id,
            section_id=sections[39].id,
        ),
        Lesson(
            title="Deep Learning Basics",
            content="https://youtube.com/watch?v=deep-learning-basics",
            course_id=courses[19].id,
            section_id=sections[40].id,
        ),
        Lesson(
            title="Building Neural Networks",
            content="https://youtube.com/watch?v=building-neural-networks",
            course_id=courses[19].id,
            section_id=sections[41].id,
        ),
        Lesson(
            title="Game Mechanics Overview",
            content="https://youtube.com/watch?v=game-mechanics",
            course_id=courses[20].id,
            section_id=sections[42].id,
        ),
        Lesson(
            title="Storytelling in Games",
            content="https://youtube.com/watch?v=storytelling-games",
            course_id=courses[20].id,
            section_id=sections[43].id,
        ),
    ]
    for lesson in lessons:
        db.add(lesson)
    db.commit()

    # Create Enrollments
    enrollments = [
        Enrollment(user_id=users[1].id, course_id=courses[0].id),
        Enrollment(user_id=users[0].id, course_id=courses[1].id),
        Enrollment(user_id=users[0].id, course_id=courses[2].id),
        Enrollment(user_id=users[1].id, course_id=courses[3].id),
        Enrollment(user_id=users[0].id, course_id=courses[4].id),
        Enrollment(user_id=users[1].id, course_id=courses[5].id),
        Enrollment(user_id=users[0].id, course_id=courses[6].id),
        Enrollment(user_id=users[1].id, course_id=courses[7].id),
        Enrollment(user_id=users[0].id, course_id=courses[8].id),
        Enrollment(user_id=users[1].id, course_id=courses[9].id),
        Enrollment(user_id=users[0].id, course_id=courses[10].id),
        Enrollment(user_id=users[1].id, course_id=courses[11].id),
        Enrollment(user_id=users[0].id, course_id=courses[12].id),
        Enrollment(user_id=users[1].id, course_id=courses[13].id),
        Enrollment(user_id=users[0].id, course_id=courses[14].id),
        Enrollment(user_id=users[1].id, course_id=courses[15].id),
        Enrollment(user_id=users[0].id, course_id=courses[16].id),
        Enrollment(user_id=users[1].id, course_id=courses[17].id),
        Enrollment(user_id=users[0].id, course_id=courses[18].id),
        Enrollment(user_id=users[1].id, course_id=courses[19].id),
        Enrollment(user_id=users[0].id, course_id=courses[20].id),
    ]
    for enrollment in enrollments:
        db.add(enrollment)
    db.commit()

def clear_data(db):
    """Clear existing data from all tables"""
    # Delete in reverse order of dependencies
    db.query(Enrollment).delete()
    db.query(Lesson).delete()
    db.query(CourseSection).delete()
    db.query(Course).delete()
    db.query(Category).delete()
    db.query(User).delete()
    db.commit()

def seed_database():
    db = SessionLocal()
    try:
        # Clear existing data
        clear_data(db)
        # Create new sample data
        create_sample_data(db)
        print("Sample data created successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()  # Rollback on error
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
