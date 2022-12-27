set SocketServerSrcFolder=C:\repos\socket-server

set SocketServerPublishFolder="\\vmware-host\Shared Folders\VMWare-Share\TestTools\Deploy\SocketServer\"

if "%1"=="index.js" (
    copy %SocketServerSrcFolder%\index.js %SocketServerPublishFolder% /y
) else (
    if exist %SocketServerPublishFolder% rmdir %SocketServerPublishFolder% /s /q

    xcopy %SocketServerSrcFolder% %SocketServerPublishFolder% /E/H/C/I
    del %SocketServerPublishFolder%publish.bat
)