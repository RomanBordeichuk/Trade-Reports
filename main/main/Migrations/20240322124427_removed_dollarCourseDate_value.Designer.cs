﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using main;

#nullable disable

namespace main.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20240322124427_removed_dollarCourseDate_value")]
    partial class removed_dollarCourseDate_value
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("main.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("main.Entities.DayStatsHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<double>("DollarCourse")
                        .HasColumnType("float");

                    b.Property<int>("MonthStatsHistoryId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MonthStatsHistoryId");

                    b.ToTable("DayStatsHistories");
                });

            modelBuilder.Entity("main.Entities.ManagerPayment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("ManagerPayment");
                });

            modelBuilder.Entity("main.Entities.MonthStatsHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Month")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("MonthStatsHistories");
                });

            modelBuilder.Entity("main.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ClientNum")
                        .HasColumnType("int");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<int>("DayStatsHistoryId")
                        .HasColumnType("int");

                    b.Property<double>("ManagerPayValue")
                        .HasColumnType("float");

                    b.Property<double>("TotalBuyPrice")
                        .HasColumnType("float");

                    b.Property<double>("TotalIncome")
                        .HasColumnType("float");

                    b.Property<double>("TotalSellPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("DayStatsHistoryId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("main.Entities.OrderProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("BuyPrice")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Num")
                        .HasColumnType("int");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<double>("SellPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderProducts");
                });

            modelBuilder.Entity("main.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("BuyPrice")
                        .HasColumnType("float");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("SellPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("main.Entities.DayStatsHistory", b =>
                {
                    b.HasOne("main.Entities.MonthStatsHistory", null)
                        .WithMany("DayStatsHistoryList")
                        .HasForeignKey("MonthStatsHistoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("main.Entities.Order", b =>
                {
                    b.HasOne("main.Entities.DayStatsHistory", null)
                        .WithMany("OrdersList")
                        .HasForeignKey("DayStatsHistoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("main.Entities.OrderProduct", b =>
                {
                    b.HasOne("main.Entities.Order", null)
                        .WithMany("ProductsList")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("main.Entities.Product", b =>
                {
                    b.HasOne("main.Entities.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("main.Entities.Category", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("main.Entities.DayStatsHistory", b =>
                {
                    b.Navigation("OrdersList");
                });

            modelBuilder.Entity("main.Entities.MonthStatsHistory", b =>
                {
                    b.Navigation("DayStatsHistoryList");
                });

            modelBuilder.Entity("main.Entities.Order", b =>
                {
                    b.Navigation("ProductsList");
                });
#pragma warning restore 612, 618
        }
    }
}
