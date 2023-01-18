If you want to use your own migrations or you want to test migration mechanism follow next steps:

Set the connection string of the following form:
"ConnectionStrings": {
    Server=(localdb)\\mssqllocaldb;Database=<your_database_name>;Trusted_Connection=True;Integrated Security=True;User Instance=False;
}
note that you have to do next steps from your working directory!

install the ef utility:
PS> dotnet tool install --global dotnet-ef

If you have migrations files delete them:
PS> dotnet ef migrations remove

Create new migrations:
PS> dotnet ef migrations add <migration_name>

Update SqlLocalDb by your migrations:
PS> dotnet ef database update

Also you have to install node and pull node_molules