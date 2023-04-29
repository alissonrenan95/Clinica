using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace ClinicaServer.Migrations
{
    /// <inheritdoc />
    public partial class initialdb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "paciente",
                columns: table => new
                {
                    id = table.Column<uint>(type: "int(10) unsigned", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    cpf = table.Column<ulong>(type: "bigint(20) unsigned", nullable: false),
                    nome = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    datanascimento = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    telefone = table.Column<ulong>(type: "bigint(20) unsigned", nullable: false),
                    urlimagem = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paciente", x => x.id);
                })
                .Annotation("Relational:Collation", "latin1_swedish_ci");

            migrationBuilder.CreateTable(
                name: "atendimento",
                columns: table => new
                {
                    id = table.Column<uint>(type: "int(10) unsigned", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    pacienteid = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    datahoraatendimento = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    concluido = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_atendimento", x => x.id);
                    table.ForeignKey(
                        name: "atendimento_ibfk_1",
                        column: x => x.pacienteid,
                        principalTable: "paciente",
                        principalColumn: "id");
                })
                .Annotation("Relational:Collation", "latin1_swedish_ci");

            migrationBuilder.CreateTable(
                name: "examecovid",
                columns: table => new
                {
                    id = table.Column<uint>(type: "int(10) unsigned", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    atendimentoid = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    febre = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    coriza = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    narizentupido = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    cansaco = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    tosse = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    dordecabeca = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    doresnocorpo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    malestargeral = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    dordegarganta = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    dificuldadederespirar = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    faltadepaladar = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    faltadeolfato = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    dificuldadedelocomocao = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    diarreia = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    concluido = table.Column<bool>(type: "tinyint(1)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_examecovid", x => x.id);
                    table.ForeignKey(
                        name: "examecovid_ibfk_1",
                        column: x => x.atendimentoid,
                        principalTable: "atendimento",
                        principalColumn: "id");
                })
                .Annotation("Relational:Collation", "latin1_swedish_ci");

            migrationBuilder.CreateTable(
                name: "examegeral",
                columns: table => new
                {
                    id = table.Column<uint>(type: "int(10) unsigned", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    atendimentoid = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    pressaosistolica = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    pressaodiastolica = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    pulsacao = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    respiracao = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    temperatura = table.Column<float>(type: "float", nullable: false),
                    concluido = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_examegeral", x => x.id);
                    table.ForeignKey(
                        name: "examegeral_ibfk_1",
                        column: x => x.atendimentoid,
                        principalTable: "atendimento",
                        principalColumn: "id");
                })
                .Annotation("Relational:Collation", "latin1_swedish_ci");

            migrationBuilder.CreateIndex(
                name: "Atendimento_FKIndex1",
                table: "atendimento",
                column: "pacienteid");

            migrationBuilder.CreateIndex(
                name: "Examecovid_FKIndex1",
                table: "examecovid",
                column: "atendimentoid");

            migrationBuilder.CreateIndex(
                name: "Examegeral_FKIndex1",
                table: "examegeral",
                column: "atendimentoid");

            migrationBuilder.CreateIndex(
                name: "Paciente_uniqueindex",
                table: "paciente",
                column: "cpf",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "examecovid");

            migrationBuilder.DropTable(
                name: "examegeral");

            migrationBuilder.DropTable(
                name: "atendimento");

            migrationBuilder.DropTable(
                name: "paciente");
        }
    }
}
